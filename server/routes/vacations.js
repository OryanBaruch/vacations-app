const router = require("express").Router();
const connection = require("../database/database");
const admin = require("../auth/admin");
const QUERY = require("../database/queryPromise");
const regularUser = require("../auth/verifyUser");

router.get("/vacations", regularUser, async (req, res) => {
  try {
    const userId=req.user.id
    const query_question = `SELECT 1 as orderId, vacations.* 
    from vacations
    inner join followed_vacations on followed_vacations.vacation_id = vacations.id
    where followed_vacations.follower_id = ${userId}
    UNION
    select 2 as orderId,
    vacations.* from vacations
    where id not in (select vacation_id from followed_vacations where follower_id = ${userId})
    order by orderId `;
    const vacations = await QUERY(query_question);
    res.status(200).json(vacations);
  } catch (error) {
    console.log("The error is: ", error);
    return res.status(403).json(error);
  }
});


router.post("/vacations", admin,  async (req, res) => {
  const {
    description,
    destination,
    image,
    starting_date,
    ending_date,
    price
  } = req.body;
  if (
    !description ||
    !destination ||
    !image ||
    !starting_date ||
    !ending_date ||
    !price
    )
    return res.json("Missing data.");
    try {
    const query_add=`INSERT into vacations (description, destination, image, starting_date, ending_date, price)
     VALUES("${description}", "${destination}","${image}", "${starting_date}", "${ending_date}", "${price}")`;
    const select_first_vacation_added=`SELECT * FROM vacations order by id desc`
      await QUERY(query_add,description, destination, image, starting_date, ending_date, price)
      const added_vacation=await QUERY(select_first_vacation_added)
      res.status(200).json(added_vacation[0])
    } catch (error) {
      return res.status(500).json({err:true, error})
    }
});

router.delete("/remove/vacations/:id",admin, async (req, res) => {
  const { id } = req.params;
  try {
    const query_fillter = `DELETE FROM followed_vacations WHERE vacation_id=${id}`;
    await QUERY(query_fillter);
    const filter = `DELETE FROM vacations WHERE vacations.id=${id}`;
    await QUERY(filter);
    const new_vacations = await QUERY(`SELECT * FROM vacations`);
    res.status(200).json(new_vacations);
  } catch (error) {
    res.status(404).json(error);
  }
});

router.put("/vacations/:id", admin, (req, res) => {
  const { id } = req.params;
  const {
    description,
    destination,
    image,
    starting_date,
    ending_date,
    price,
  } = req.body;
  const query_question = `UPDATE vacations SET description="${description}",destination="${destination}"
     ,image="${image}",starting_date="${starting_date}",ending_date="${ending_date}", price="${price}"
      WHERE vacations.id=${id}`;
  connection.query(query_question, (err, results) => {
    if (err) return res.status(400).send(err);
    console.log(results)
    res.status(201).json(results);
  });
});
module.exports = router;
