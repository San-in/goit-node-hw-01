const fs = require("fs/promises");
const updateFile = async (path, updatedList) => {
  await fs.writeFile(path, JSON.stringify(updatedList, null, 2));
};
module.exports = updateFile;
