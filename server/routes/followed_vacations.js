const router = require("express").Router();
const connection = require("../database/database");
const regularUser = require("../auth/verifyUser");
const admin = require("../auth/admin");
const QUERY = require("../database/queryPromise");


router.get("/followed-vacations/:id", regularUser, async (req, res) => {
  try {
    const { id } = req.params;
    const query = `SELECT count(followed_vacations.follower_id)as followers 
    FROM followed_vacations
    WHERE vacation_id=${id}`;
    const selectedQuery = await QUERY(query);
    console.log(selectedQuery[0])
    res.status(200).json({ err: false, FollowedTable: selectedQuery[0] });
  } catch (error) {
    res.status(401).json({ Error: error });
  }
});


router.post("/follow/:vacationId", regularUser, (req, res) => {
  const { vacationId } = req.params;
  const userId = req.user.id;
  let query_follow_vacation = `INSERT INTO followed_vacations(follower_id, vacation_id)
    VALUES("${userId}","${vacationId}")`;
  connection.query(query_follow_vacation, (err, results) => {
    if (err) return res.status(404).send("Couldnt find followed vacations.");
    res.status(201).json(results);
  });
});


router.delete("/follow/:vacationId", regularUser, (req, res) => {
  const { vacationId } = req.params;
  const userId = req.user.id;
  let query_question = `DELETE from followed_vacations WHERE
     follower_id=${userId} AND vacation_id=${vacationId}`;
  connection.query(query_question, (err, results) => {
    if (err) return res.status(404).send("Couldnt DELETE followed vacations.");
    res.status(201).json(results);
  });
});

router.get('/chart/followers', admin, async (req, res)=>{
  const get_all_followers=`SELECT vacations.destination, COUNT(followed_vacations.vacation_id) AS followed
  FROM vacations
  INNER JOIN followed_vacations WHERE followed_vacations.vacation_id = vacations.id
  GROUP BY vacations.destination
  ORDER BY Followed DESC`
  try {
    const followers=await QUERY(get_all_followers)
    res.status(200).json({err:false, chart:followers})
  } catch (error) {
    res.status(418).json({Err:error})
  }
})
//remember: .chart lead to the followers.
module.exports = router;
