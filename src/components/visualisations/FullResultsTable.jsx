import { commas, oneDecimal } from "../../utils";

export function FullResultsTable({
  partiesTableItems,
  partiesTableFields,
  partiesTableColumns,
}) {
  return (
    <table className="table table-condensed parties-table">
      <thead>
        <tr>
          {partiesTableFields.map((field) => (
            <th key={field.key}>{field.label}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {partiesTableItems.map((item, index) => (
          <tr key={index}>
            {partiesTableColumns.map((column) => {
              switch (column) {
                case "name":
                  return (
                    <td
                      key={column}
                      dangerouslySetInnerHTML={{
                        __html: item[column],
                      }}
                    />
                  );
                case "totalVotes":
                  return <td key={column}>{commas(item[column])}</td>;
                case "totalVotesPerSeat":
                  return (
                    <td key={column}>
                      {item.totalSeats > 0 ? commas(item[column]) : "N/A"}
                    </td>
                  );
                case "totalVotesShare":
                  return (
                    <td key={column}>
                      {!oneDecimal(item[column]) ? (
                        <>
                          <span style={{ fontFamily: "Arial" }}>&lt;</span>
                          <span> 0.1</span>
                        </>
                      ) : (
                        oneDecimal(item[column])
                      )}
                    </td>
                  );
                case "totalSeatsShare":
                  return <td key={column}>{oneDecimal(item[column])}</td>;
                default:
                  return <td key={column}>{item[column]}</td>;
              }
            })}
          </tr>
        ))}
      </tbody>
    </table>
  );
}
