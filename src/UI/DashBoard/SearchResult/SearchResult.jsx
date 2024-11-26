const searchResults = [
  {
    id: 1,
    title: "Bye Bye Mongo, Hello Postgres",
    url: "https://www.theguardian.com/info/2018/nov/30/bye-bye-mongo-hello-postgres",
    points: 1562,
    author: "philliphayton",
    time: "6 years ago",
    comments: 417,
  },
  {
    id: 2,
    title: "Hello, GitHub",
    url: "https://natfriedman.github.io/hello",
    points: 1498,
    author: "rafaelc",
    time: "6 years ago",
    comments: 644,
  },
  {
    id: 3,
    title: "Hello Chrome, it's Firefox calling",
    url: "https://hacks.mozilla.org/2013/02/hello-chrome-its-firefox-calling",
    points: 1388,
    author: "ryman",
    time: "12 years ago",
    comments: 69,
  },
  // Add more sample results as needed
];
const SearchResult = () => {
  return (
    <div className="container mx-auto py-4">
      <div className="space-y-4">
        {searchResults.map((result) => (
          <div key={result.id} className="space-y-1">
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
              {result.points} points | {result.author} | {result.time} |{" "}
              {result.comments} comments
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SearchResult;
