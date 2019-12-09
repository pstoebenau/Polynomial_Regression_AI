const a = tf.variable(tf.scalar(Math.random()));
const b = tf.variable(tf.scalar(Math.random()));
const c = tf.variable(tf.scalar(Math.random()));
const d = tf.variable(tf.scalar(Math.random()));
const e = tf.variable(tf.scalar(Math.random()));
const learningRate = 0.001;
const optimizer = tf.train.sgd(learningRate);

function predict(xs){
  const x = tf.tensor1d(xs);
  //y = ax^4 + bx^3 + cx^2 + dx + e
  const pred = a.mul(x.pow(tf.scalar(4))).add(b.mul(x.pow(tf.scalar(3)))).add(c.mul(x.pow(tf.scalar(2)))).add(d.mul(x)).add(e);

  return pred;
}

function loss(pred, ys){
  return tf.tidy(() => {
    let actual = tf.tensor1d(ys);
    return pred.sub(actual).square().mean();
  });
}

async function train(xs, ys, iterations){
  for (let i = 0; i < iterations; i++)
    optimizer.minimize(() => loss(predict(xs), ys));

  await tf.nextFrame();
}
