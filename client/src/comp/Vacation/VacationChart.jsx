import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllFollowers } from "../../REDUX/ACTIONS/vacation_action";
import { Redirect } from "react-router-dom";
import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend } from "recharts";
import "./vacation.css";
import Page403 from "../page403/Page403";

const VacationChart = () => {
  const dispatch = useDispatch();

  const { userInfo } = useSelector((state) => state.userReducer);
  const isAdmin = userInfo?.role === 1;

  const followerReducer = useSelector((state) => state.followerReducer);

  useEffect(() => {
    (async () => {
      await dispatch(fetchAllFollowers());
    })();
  }, []);
  

  return (
    <div className="chart_container">
      {isAdmin?(
        <BarChart width={900} height={600} data={followerReducer}>
          <XAxis dataKey="destination" />
          <YAxis type="number" domain={[0, followerReducer[0]?.followed + 2]} />
          <Tooltip wrapperStyle={{ width: 100, backgroundColor: "#ccc" }} />
          <Legend
            width={100}
            wrapperStyle={{
              top: 40,
              right: 20,
              backgroundColor: "#f5f5f5",
              border: "1px solid #d5d5d5",
              borderRadius: 3,
              lineHeight: "40px",
            }}
          />
          <Bar dataKey="followed" fill="#8884d8" barSize={30} />
        </BarChart>
      ) : <Page403 />}
    </div>
  );
};

export default VacationChart;
