get all vacations
router.get("/", verifyToken, async (req, res) => {
  try {
    const select_all = `select 1 as orderId, vacations.* from vacations
    inner join followers on followers.vacationID = vacations.id
    where followers.userID = ${req.userId}
    UNION
    select 2 as orderId, vacations.* from vacations
    where id not in (select vacationID from followers where userID = ${req.userId})
    order by orderId`;
    const vacations = await Query(select_all);
    res.status(200).json(vacations);
  } catch (error) {
    res.json(error);
  }
});