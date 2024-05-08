import React from "react"
import "./App.css"
import SortLinks from "./SortLinks"
import Pagination from "./Pagination"

function App() {
  const [loading, setLoading] = React.useState(false)
  const [error, setError] = React.useState(null)
  const [launches, setLaunches] = React.useState(null)
  const [searchTerm, setSearchTerm] = React.useState(null)
  const [page, setPage] = React.useState(1)
  const pageSize = 10

  const [sortAttribute, setSortAttribute] = React.useState({
    name: "date",
    order: "desc",
  })

  React.useEffect(() => {
    setLoading(true)
    setError(null)
    fetch("https://api.spacexdata.com/v4/launches")
      .then((r) => r.json())
      .then(setLaunches)
      .finally(() => setLoading(false))
  }, [])

  const sortedFilteredItems = React.useMemo(() => {
    if (!launches) return null
    let items = launches.slice()
    if (searchTerm)
      items = items.filter((item) => {
        return (
          item.name.indexOf(searchTerm) >= 0 ||
          item.date_local.indexOf(searchTerm) >= 0
        )
      })
    if (sortAttribute) {
      items = items.sort((a, b) => {
        if (sortAttribute.order === "asc") {
          return a[sortAttribute.name] > b[sortAttribute.name] ? 1 : -1
        } else {
          return a[sortAttribute.name] < b[sortAttribute.name] ? 1 : -1
        }
      })
    }
    const startIndex = (page - 1) * pageSize
    items = items.slice(startIndex, startIndex + pageSize)
    return items
  }, [launches, searchTerm, sortAttribute, page])

  return (
    <div className="App">
      <div className="title">Rockets rock</div>
      {loading ? (
        <span className="loading">Loading...</span>
      ) : error ? (
        <span>Error: {JSON.stringify(error)}</span>
      ) : sortedFilteredItems ? (
        <>
          <div className="toolbar">
            <div>
              <input
                className="search"
                value={searchTerm || ""}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search by name or date"
              ></input>
            </div>
          </div>
          <table className="launches">
            <thead>
              <tr>
                <th>
                  Name <SortLinks name="name" handleClick={setSortAttribute} />
                </th>
                <th>
                  Date{" "}
                  <SortLinks name="date_local" handleClick={setSortAttribute} />
                </th>
                <th>Image</th>
                <th>Link</th>
              </tr>
            </thead>
            <tbody>
              {sortedFilteredItems.map((launch, index) => (
                <tr key={index}>
                  <td>{launch.name}</td>
                  <td className="min">{launch.date_local}</td>
                  <td className="min">
                    {launch.links?.patch?.small && (
                      <img height="30" src={launch.links.patch.small} />
                    )}
                  </td>
                  <td>
                    {launch.links?.article && (
                      <a href={launch.links.article} target="_blank">
                        Article
                      </a>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <Pagination
            page={page}
            onChange={setPage}
            total={sortedFilteredItems?.length}
          />
        </>
      ) : (
        <span>No Launches found</span>
      )}
    </div>
  )
}

export default App
