import { Link } from "react-router-dom";
import moment from "moment";
import "./searchresult.css";

export default function Results({ results, filtertypes }) {
  return (
    <div className="container mx-auto py-4">
      <div className="space-y-4">
        {results.map((result) => (
          <div key={result.objectID} className="space-y-1">
            <div className="flex items-baseline gap-2">
              <h2 className="text-base">
                <a href={result.url} className="hover:underline">
                  {(filtertypes === "stories") |
                    (filtertypes === "poll") |
                    (filtertypes === "show_hn") |
                    (filtertypes === "launch_hn") |
                    (filtertypes === "job") &&
                    (result.title || "Untitled")}
                  {filtertypes === "comment" && (
                    <div
                      dangerouslySetInnerHTML={{
                        __html:
                          result.comment_text || "<p>No comments available</p>",
                      }}
                    ></div>
                  )}
                  {filtertypes === "ask_hn" && (
                    <>
                      <div className="ask-element">{result.title}</div>
                      <div
                        className="ask-html"
                        dangerouslySetInnerHTML={{
                          __html:
                            result.story_text || "<p>No comments available</p>",
                        }}
                      ></div>
                    </>
                  )}
                </a>
              </h2>
              {result.url && (
                <span className="text-sm text-gray-500">({result.url})</span>
              )}
            </div>
            <div className="text-sm text-gray-600">
              {result.points} points | {result.author} |{" "}
              {moment(result.created_at)
                .format("MMMM Do, YYYY")
                .toLocaleString()}{" "}
              | {result.num_comments} comments
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
