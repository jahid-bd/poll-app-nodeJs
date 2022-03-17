const Poll = require("./model");

exports.homeController = (req, res) => {
  res.render("./pages/home");
};

exports.createPollGetController = (req, res) => {
  res.render("./pages/create");
};

exports.createPollPostController = async (req, res) => {
  let { title, description, options } = req.body;

  options = options.map((opt) => {
    return {
      name: opt,
      vote: 0,
    };
  });

  let poll = new Poll({
    title,
    description,
    options,
  });

  try {
    await poll.save();
    res.redirect("/polls");
  } catch (e) {
    console.log(e);
  }

  res.render("./pages/create");
};

exports.pollsGetController = async (req, res) => {
  try {
    let polls = await Poll.find();
    res.render("./pages/polls", { polls });
  } catch (e) {
    console.log(e);
  }
};

// exports.pollDeleteController = async (req, res) => {
//   console.log(req.body);
//   console.log("clicked");
//   res.redirect("/polls");
//   // try {
//   // } catch (e) {
//   //   console.log(e);
//   // }
// };

exports.viewPollGetController = async (req, res) => {
  let id = req.params.id;
  try {
    let poll = await Poll.findById(id);

    let options = [...poll.options];

    let result = [];

    options.forEach((opt) => {
      let percentage = (opt.vote * 100) / poll.totalVotes;
      result.push({
        ...opt._doc,
        percentage: percentage ? percentage : 0,
      });
    });

    res.render("./pages/viewPoll", { poll, result });
  } catch (e) {
    console.log(e);
  }
};

exports.viewPollPostController = async (req, res) => {
  let id = req.params.id;

  let optId = req.body.option;

  try {
    let poll = await Poll.findById(id);

    let options = [...poll.options];

    let index = options.findIndex(
      (o) => o.id.toString().trim() === optId.toString().trim()
    );

    options[index].vote += 1;

    let totalVotes = (poll.totalVotes += 1);

    await Poll.findOneAndUpdate(
      { _id: poll._id },
      { $set: { totalVotes, options } }
    );

    res.redirect("/polls/" + id);
  } catch (e) {
    console.log(e);
  }
};
