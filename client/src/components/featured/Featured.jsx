import './featured.scss';
import "react-circular-progressbar/dist/styles.css";
import { CircularProgressbar } from 'react-circular-progressbar';

const Featured = () => {
  return (
    <div className="featuredContainer">
      <div className="top">
        <h1 className="title">Active User Rate</h1>
      </div>

      <div className="bottom">
        <div className="featuredChart">
          <CircularProgressbar value={70} text={"70%"} strokeWidth={5} className='circle'></CircularProgressbar>
        </div>

        <p className="title">Total uses made today</p>
        <p className="amount">%42</p>
        <p className="desc">Previous transactions processing. Last uses may not be included.</p>

        <div className="summary">
          <div className="item">
            <div className="itemTitle">Target</div>
            <div className="itemResult">%80</div>
          </div>

          <div className="item">
            <div className="itemTitle">Last Week</div>
            <div className="itemResult">%50</div>
          </div>

          <div className="item">
            <div className="itemTitle">Last Month</div>
            <div className="itemResult">%57</div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Featured