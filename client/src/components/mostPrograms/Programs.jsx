import './program.scss';

const Programs = ({ programs }) => {
  return (
    <div className='programContainer'>
      <div className="title">Most Used Programs</div>

      <table className='table'>
        <thead>
          <tr>
            <th scope="col" class="px-6 py-3">Program Name</th>
            <th scope="col" class="px-6 py-3">Program Description</th>
            <th scope="col" class="px-6 py-3">Program Duration</th>
            <th scope="col" class="px-6 py-3">Program Time</th>
          </tr>
        </thead>

        <tbody>
          {programs.map((program) => (
            <tr key={program.data._id}>
              <td>{program.data.p_name}</td>
              <td>{program.data.p_description}</td>
              <td>{program.data.duration}</td>
              <td>{program.data.time}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default Programs