import Masonry, { ResponsiveMasonry } from "react-responsive-masonry";
import { SRLWrapper } from "simple-react-lightbox";

import "../../styles/businessPage/masonryGallery.css";

function MasonryGalery(props) {
  const { photosArrs } = props;
  return (
    <div>
      <SRLWrapper>
        <ResponsiveMasonry
          columnsCountBreakPoints={{ 100: 1, 400: 2, 900: 3, 1000: 4 }}
        >
          <Masonry columnsCount={3} gutter="10px">
            {photosArrs?.map((image, i) => (
              <img alt="" key={i} src={image} className="imgSRL" />
            ))}
          </Masonry>
        </ResponsiveMasonry>
      </SRLWrapper>
    </div>
  );
}

export default MasonryGalery;
