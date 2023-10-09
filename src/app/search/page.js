import getVideosBySearch from "../actions/getVideosBySearch";
import SearchPage from "./SearchPage";

export default async function page(req) {
  const search = req.searchParams.name;

  const videos = await getVideosBySearch(search);

  return (
    <>
      <SearchPage search={search} listOfVideos={videos} />
    </>
  );
}
