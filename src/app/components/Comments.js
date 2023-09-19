export default function Comments({ comments }) {
  console.log("comments", comments);
  return (
    <div className="grow flex flex-col overflow-y-auto w-full mt-4">
      {comments.map((comment) => {
        return (
          <div className="flex flex-col gap-1 py-4">
            <div className="flex gap-1 items-center">
              <img
                className="rounded-full"
                src={comment.user.image}
                width={25}
                height={25}
              />
              <p className="text-xs">{"@" + comment.user.username}</p>
            </div>
            <div className="flex flex-col">
              <p className="text-sm">{comment.text}</p>
              <p className="text-xs text-gray-400">
                {new Date(comment.createdAt).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "short",
                  day: "numeric",
                  hour: "numeric",
                  minute: "numeric",
                })}
              </p>
            </div>
          </div>
        );
      })}
    </div>
  );
}
