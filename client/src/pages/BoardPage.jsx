import { useParams } from "react-router-dom";
import { useGetBoardByIdQuery } from "../redux/boards/boardsApi";

export default function BoardPage() {
  const { boardId } = useParams();
  const { data, isLoading, isError, error } = useGetBoardByIdQuery(boardId, { skip: !boardId });

  if (!boardId) return <div>No board selected</div>;
  if (isLoading) return <div>Loading board...</div>;
  if (isError) return <div>Failed: {error?.data?.message || "Error"}</div>;

  return (
    <div>
      <h2>{data?.title}</h2>
      {/* diğer içerikler: null-check ile */}
    </div>
  );
}
