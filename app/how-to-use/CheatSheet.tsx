import cheatSheet from "@/constants/elementsAndSyntax";

export default function CheatSheet() {
  return (
    <div className="overflow-x-auto mx-auto mb-4">
      <table className="table table-zebra">
        <thead>
          <tr>
            <th></th>
            <th>Element</th>
            <th>Syntax</th>
            <th>Example</th>
          </tr>
        </thead>
        <tbody>
          {/* row 1 */}
          {cheatSheet.map(({ element, syntax, preview }, index) => (
            <tr key={element}>
              <th>{index}</th>
              <td>{element}</td>
              <td>{syntax}</td>
              <td dangerouslySetInnerHTML={{ __html: preview }}></td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
