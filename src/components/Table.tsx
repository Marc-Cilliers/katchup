import { Spinner } from "./Spinner";

interface TableProps {
  headers: string[];
  rows: any[][];
  className?: string;
  showSpinner?: boolean;
}

export const Table = ({
  headers,
  rows,
  className = "",
  showSpinner,
}: TableProps) => {
  return (
    <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400 dark">
      <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
        <tr>
          <th scope="col" className="px-6 py-3">
            #
          </th>
          {headers.map((h) => (
            <th key={h} scope="col" className="px-6 py-3">
              {h}
            </th>
          ))}
        </tr>
      </thead>
      {showSpinner && (
        <div>
          <Spinner />
        </div>
      )}
      {!showSpinner && (
        <tbody>
          {rows.map((row, index) => (
            <tr
              key={index}
              className={`border-b border-gray-700 ${
                index % 2 === 0 ? "bg-gray-900" : "bg-gray-800"
              }`}
            >
              <th className="px-6 py-4">{index + 1}</th>
              {row.map((column, index) => {
                if (index === 0) {
                  return (
                    <td key={index} className="px-6 py-4 text-white">
                      {column}
                    </td>
                  );
                }

                return (
                  <td key={index} className="px-6 py-4">
                    {column}
                  </td>
                );
              })}
            </tr>
          ))}
        </tbody>
      )}
    </table>
  );
};
