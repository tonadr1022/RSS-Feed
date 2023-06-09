import { useSelector } from "react-redux";
const HomePage = () => {
  const { userInfo } = useSelector((state) => state.auth);

  return (
    <main>
      {userInfo ? <h1>logged in home page feed</h1> : <h1>please login</h1>}
    </main>
  );
};

export default HomePage;
