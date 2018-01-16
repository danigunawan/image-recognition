const cv = require('opencv4nodejs');
// console.log(cv)

const findWaldo = async () => {
  // Load images
  const originalMat = await cv.imreadAsync(`./static/img/colors-1.jpg`);
  const waldoMat = await cv.imreadAsync(`./static/img/colors-change-1.jpg`);

  // Match template (the brightest locations indicate the highest match)
  const matched = originalMat.matchTemplate(waldoMat, 5);

  // originalMat.matchTemplateAsync(waldoMat, 5, (err, res) => {
  //     if (err) {
  //         console.log('err', err)
  //     }
  //     console.log(res)
  // })

  // Use minMaxLoc to locate the highest value (or lower, depending of the type of matching method)
  const minMax = matched.minMaxLoc();
  const { maxLoc: { x, y } } = minMax;

  // Draw bounding rectangle
  originalMat.drawRectangle(
      new cv.Point(x, y),
      new cv.Point(x + waldoMat.cols, y + waldoMat.rows),
      new cv.Vec(0, 255, 0),
      cv.LINE_8,
      2
  )

  // Open result in new window
  cv.imshow('We\'ve found Waldo!', originalMat);
  cv.waitKey(700000);  // time
};

// noinspection JSIgnoredPromiseFromCall
findWaldo();
