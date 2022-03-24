import {Helmet} from "react-helmet";

function HemletComponent(props){
const {seoTitle, seoDescription, seoKeywords, seoImage}=props
    return(
        <Helmet>
        <meta charSet="utf-8" />
        <title>{seoTitle}</title>
        <meta name="description" content={seoDescription} />
        <meta name="keywords" content={seoKeywords} />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={window.location.href} />
        <meta property="og:title" content={seoTitle} />
        <meta property="og:image" content={seoImage} />
        <link rel="canonical" content={window.location.href} />
      </Helmet>
  );
}
export default HemletComponent
