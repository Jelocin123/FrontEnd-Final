import React from 'react';
import images from '../data/footer.json';
import style from '../styles/Footer.module.scss';

interface ImageData {
  url: string;
  alt: string;
  showImage: boolean;
}

interface FooterProps {
  isLastPage: boolean;
}

const Footer: React.FC<FooterProps> = ({ isLastPage }) => {
  const imageToShow = isLastPage ? images[images.length - 1] : images.find((image: ImageData) => image.showImage);

  return (
    <footer className="container d-lg-none d-md-none">
      <div className="row mt- mt-lg-0 mt-md-0 mt-sm-0 mb-5">
        <div className=" col-12 d-flex align-items-center justify-content-end">
          {imageToShow && (
            <div>
              <img 
              id={style.logo} 
              src={imageToShow.url} 
              alt={imageToShow.alt}/>
            </div>
          )}
        </div>
      </div>
    </footer>
  );
};

export default Footer;
