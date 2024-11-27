import { Link } from "react-router-dom";
import moment from "moment";

export default function Results({ results }) {
  return (
    <div className="container mx-auto py-4">
      <div className="space-y-4">
        {results.map((result) => (
          <div key={result.objectID} className="space-y-1">
            <div className="flex items-baseline gap-2">
              <h2 className="text-base">
                <a href={result.url} className="hover:underline">
                  {result.title}
                </a>
              </h2>
              {result.url && (
                <span className="text-sm text-gray-500">({result.url})</span>
              )}
            </div>
            <div className="text-sm text-gray-600">
              {result.points} points | {result.author} |{" "}
              {
                moment(result.created_at).format("MMMM Do, YYYY").toLocaleString()
              }{" "} | {" "}
              {result.num_comments} comments
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
