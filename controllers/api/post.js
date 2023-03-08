const router = require('express').Router();
const { Post } = require('../../models/');
const authorization = require('../../utils/utils');

router.post('/', authorization, async (req, res) => {
  const data = req.body;
  try {
    const post = await Post.create({ ...data, userId: req.session.userId });
    res.json(post);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.put('/:id', authorization, async (req, res) => {
  try {
    const [populate] = await Post.update(req.body, {
      where: {
        id: req.params.id
      }
  });

  if (populate > 0) {
      res.status(200).end();
  } else {
      res.status(404).end();
  }
  } catch (err) {
      res.status(500).json(err);
  }
});

router.delete('/:id', authorization, async (req, res) => {
  try {
    const [populate] = Post.destroy({
      where: {
        id: req.params.id
      }
  });

  if (populate > 0) {
      res.status(200).end();
  } else {
      res.status(404).end();
  }
  } catch (err) {
      res.status(500).json(err);
  }
});

module.exports = router;