import { useSelector } from "react-redux";
import FeedContentList from "../features/feedContent/FeedContentList";
import { useGetAllFeedContentsQuery } from "../features/feedContent/feedContentsApiSlice";
const HomePage = () => {
  const { userInfo } = useSelector((state) => state.auth);
  const {
    data: feedContent,
    isLoading,
    isSuccess,
  } = useGetAllFeedContentsQuery();

  if (feedContent) {
    console.log(feedContent);
  }
  return (
    <main>
      {userInfo ? <h1>logged in home page feed</h1> : <h1>please login</h1>}
      {feedContent && <FeedContentList feedContent={feedContent} />}
    </main>
  );
};

export default HomePage;
