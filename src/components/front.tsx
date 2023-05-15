import style from '@/styles/Front.module.scss';
import logo from '../../public/assets/logo-final 2.png';
import Image from 'next/image';
import data from '../data/content.json';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';
import boxes from '../data/boxes.json'

interface Content {
  title: string;
  imageMobile: string;
  imageDesktop: string;
  link: string;
}

const Front = () => {
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

  const handleClick = (path:string) => {
    router.push(path);
  };

  const [activeBoxIndex, setActiveBoxIndex] = useState(0);

  const handleBoxClick = (index: number) => {
    setActiveBoxIndex(index);
  };

  const activeBoxColor = boxes[activeBoxIndex]?.color;

  return (
    <>
    <main className='container w-75'>
      <div className='row justify-content-end'>

        <div className="col mt-4 ms-lg-5 ps-lg-5 mb-3 d-none d-lg-block ">
        <div className="d-flex justify-content-start">
        {boxes.map((box, index) => (
          <Link href={box.link} key={box.id}>
            <div
            className={`${style.box} ${index === activeBoxIndex ? style.active : ''}`}
            style={{ backgroundColor: box.color }}
            onClick={() => handleBoxClick(index)}
            >
        
            </div>
          </Link>
              ))}
          </div>
              {activeBoxIndex !== null && (
                <div
                  style={{ backgroundColor: activeBoxColor }}
                ></div>
              )}
            </div>
        <div className="navbar-brand col-lg-4 col-12 ps-1 me-lg-3 mt-lg-4 mt-3 text-lg-end text-md-end">
          <a href="/">
          <Image 
            src={logo}
            alt="logo" 
            className="img-fluid  mt-lg-0 mt-lg-0 pt-0"
            id={style.logo}/>
            </a>
        </div>

        
      </div>
        
      <div className='row justify-content-center'>
        {content.map((item, index) => (
          <div key={index} className={`col-12 col-lg-3 col-md-4 pt-0 pb-0 p-3 p-lg-0 ms-lg-5 ${index !== 0 ? ' mt-3 mt-lg-0 mt-md-0 mt-lg-0' : ''} ${index === 1 ? 'flex-row-reverse' : 'flex-row'}`}>
            <Link href={item.link}>
              <span onClick={() => handleClick(item.link)}>
                <img 
                className='img-fluid' 
                src={isMobile ? item.imageMobile : item.imageDesktop} 
                alt={item.title} 
                style={!isMobile ? { height: "600px", width: "250px" } : {}}/>
              </span>
            </Link>
          </div>
        ))}
        <div className='row justify-content-end p-1 mt-2 '>
        <p  className='text-bg-dark  me-lg-5 col-lg-3 col-6 me-3 text-center p-1 pt-0 pb-0' id={style.headliner}>And yet... more to come</p>
      </div>
      </div>
      
      
</main>
      
    </>
  );
};

export default Front;
