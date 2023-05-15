import style from '@/styles/WhatWeDo.module.scss';
import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import backButtonImage from '../../public/assets/back.png';
import boxes from '../data/boxes.json';
import React, { useState, useEffect } from 'react';
import Footer from '@/components/footer';
import data from '../data/whatwedo.json'

interface Content {
  title: string;
  imageMobile: string;
  imageDesktop: string;
  link: string;
}

const WhatWeDo = () => {
  const [activeBoxIndex, setActiveBoxIndex] = useState(0);
  const router = useRouter();
  const [content, setContent] = useState<Content[]>(data.content);
  const [isMobile, setIsMobile] = useState<boolean>(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    setIsMobile(window.innerWidth <= 768);
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const handleBoxClick = (index: number) => {
    setActiveBoxIndex(index);
    router.push(boxes[index].link);
  };

  useEffect(()=>{

    setActiveBoxIndex(0);

  },[activeBoxIndex])

  const activeBoxColor = boxes[activeBoxIndex]?.color;

  return (
    <>
      <Head>
        <title>WhatWeDo</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main id={style.main}>
        <div className="container">
          <div className="row mt-5">
            <div className="col-lg-1 col-3">
              <div className={style.backButton}>
                <button onClick={() => window.history.back()} id={style.backButtonBackground}>
                  <Image src={backButtonImage} alt="Back" id={style.backButtonImage} />
                </button>
              </div>
            </div>
            <div className="col">
              <div className="d-flex justify-content-end justify-content-lg-start ms-lg-0 ms-md-4">
                {boxes.map((box, index) => (
                  <div
                    key={box.id}
                    className={`${style.box} ${index === activeBoxIndex ? style.active : ''}`}
                    style={{ backgroundColor: box.color }}
                    onClick={() => handleBoxClick(index)}
                  >
                    <div></div>
                  </div>
                ))}
              </div>
              {activeBoxIndex !== null && (
                <div
                  style={{ backgroundColor: activeBoxColor }}
                ></div>
              )}
            </div>
          </div>

                
          <article className='row ms-lg-5 ps-lg-5 mt-lg-3'>

                <section className='col-12 col-lg-3 col-md-4 mt-4 '>
                  <figure>
                  {content.map((item, index) => (
                <div key={index}>
                <img 
                className='img-fluid' 
                src={isMobile ? item.imageMobile : item.imageDesktop} 
                alt={item.title}
                style={!isMobile ? { height: "650px", width: "250px" } : {}} />
                </div>
               ))}
                  </figure>
                </section>

            <section className='col-12 col-lg-9 col-md-8 mt-4 '>
              <h2 className='mb-0' id={style.h2}>Design is the matter of choise ...</h2>
              <p id={style.p}>But i must explain to you how all this mistaken idea of denouncing <br /> pleasure and praising pain was born and i will give you a complete account of the system, and expound  the acutal teachings of the great explorer of the truth, the master-builder of human happiness. No one rejects, dislikes, or avoids pleasure itself, because it is pleasure, but because those who do not know how to pursue pleasurerationally encounter consequences that are.</p>
              <p id={style.p}>But i must explain to you how all this mistaken idea of denouncing pleasure and praising pain was born and i will give you a complete account of the system, and expound all actual teachings of the great explorer of the truth, the master-builder of human happiness. No one rejects, dislikes, or avoids pleasure itself, because it is pleasure, but because those who do not know how to pursue pleasure rationally encounter consequences that are.</p>
              <p id={style.p}>because those who do not know how to pursue pleasure rationally encounter consequences that are.</p>
              <div className='row justify-content-end p-1  '>
              <p  className='text-bg-dark   col-lg-3 text-center p-2 pt-0 pb-0 d-none d-lg-block' id={style.headliner}>WhatWeDo</p>
              </div>
            </section>
            </article>

          <Footer isLastPage={false}/>


        </div>
      </main>
    </>
  );
};

export default WhatWeDo;
