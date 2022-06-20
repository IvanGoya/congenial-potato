const router = require("express").Router();
const { Kanban } = require("../../models");

router.get("/", async (req,res) => {
    try {
        const kanbanData = await Kanban.findAll( {
            include: [
                {
                    model: kanban,
                },
            ],
        });
        res.status(200).json(kanbanData)
        console.log(kanbanData)
    }
    catch(err) {
        res.status(400).json(err);
    }
});

module.exports = router;