import React, {FC} from "react"
import ContentLoader from "react-content-loader"

type MyLoaderPropsType = {
    key: string
}

const MyLoader:FC<MyLoaderPropsType> = (props) => (
    <ContentLoader
        className="pizza-block"
        speed={2}
        width={280}
        height={465}
        viewBox="0 0 280 465"
        backgroundColor="#f3f3f3"
        foregroundColor="#ecebeb"
        {...props}
    >
        <circle cx="130" cy="130" r="130" />
        <rect x="8" y="286" rx="0" ry="0" width="242" height="37" />
        <rect x="11" y="337" rx="0" ry="0" width="240" height="168" />
    </ContentLoader>
)

export default MyLoader
