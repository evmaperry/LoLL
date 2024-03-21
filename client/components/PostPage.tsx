import React from 'react';
import { useSearchParams } from 'react-router-dom';

const PostPage:React.FC = () => {

  let [searchParams, setSearchParams] = useSearchParams();


return (
<>
<h1>PostPage</h1>
{searchParams}
</>


)

}

export default PostPage;