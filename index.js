const fs = require("fs");
const path = require("path");

const FOLDERS = ["models", "views", "controllers", "routes"];

const templates = {
  models: {
    "index.js": `const UserModel = require("./UserModel");

module.exports = { UserModel };
`,
    "UserModel.js": `// UserModel.js
// Define your data structure or database schema here

class UserModel {
  constructor(id, name, email) {
    this.id = id;
    this.name = name;
    this.email = email;
  }
}

module.exports = UserModel;
`,
  },

  views: {
    "index.js": `// Views index
// Export your view templates or rendering logic here

module.exports = {};
`,
    "userView.js": `// userView.js
// Format user data for API responses

function formatUser(user) {
  return {
    id: user.id,
    name: user.name,
    email: user.email,
  };
}

function formatUsers(users) {
  return users.map(formatUser);
}

module.exports = { formatUser, formatUsers };
`,
  },

  controllers: {
    "index.js": `const userController = require("./userController");

module.exports = { userController };
`,
    "userController.js": `// userController.js
// Handle request logic for user-related routes

const getAllUsers = (req, res) => {
  // TODO: fetch users from model
  res.status(200).json({ success: true, message: "Get all users", data: [] });
};

const getUserById = (req, res) => {
  const { id } = req.params;
  // TODO: fetch user by id from model
  res.status(200).json({ success: true, message: \`Get user \${id}\`, data: null });
};

const createUser = (req, res) => {
  const { name, email } = req.body;
  // TODO: create user in model
  res.status(201).json({ success: true, message: "User created", data: { name, email } });
};

const deleteUser = (req, res) => {
  const { id } = req.params;
  // TODO: delete user from model
  res.status(200).json({ success: true, message: \`User \${id} deleted\` });
};

module.exports = { getAllUsers, getUserById, createUser, deleteUser };
`,
  },

  routes: {
    "index.js": `const express = require("express");
const router = express.Router();
const userRoutes = require("./userRoutes");

router.use("/users", userRoutes);

module.exports = router;
`,
    "userRoutes.js": `// userRoutes.js
const express = require("express");
const router = express.Router();
const { getAllUsers, getUserById, createUser, deleteUser } = require("../controllers/userController");

router.get("/", getAllUsers);
router.get("/:id", getUserById);
router.post("/", createUser);
router.delete("/:id", deleteUser);

module.exports = router;
`,
  },
};

const appTemplate = `const express = require("express");
const routes = require("./routes");

const app = express();

app.use(express.json());
app.use("/api", routes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(\`Server running on port \${PORT}\`);
});

module.exports = app;
`;

/**
 * Scaffold an MVC folder structure
 * @param {string} targetDir - Directory to scaffold into (default: current working directory)
 */
function scaffold(targetDir = process.cwd()) {
  let created = 0;
  let skipped = 0;

  FOLDERS.forEach((folder) => {
    const folderPath = path.join(targetDir, folder);

    if (!fs.existsSync(folderPath)) {
      fs.mkdirSync(folderPath, { recursive: true });
    }

    const files = templates[folder];
    Object.entries(files).forEach(([filename, content]) => {
      const filePath = path.join(folderPath, filename);
      if (!fs.existsSync(filePath)) {
        fs.writeFileSync(filePath, content);
        created++;
      } else {
        skipped++;
      }
    });
  });

  // Generate app.js at root
  const appPath = path.join(targetDir, "app.js");
  if (!fs.existsSync(appPath)) {
    fs.writeFileSync(appPath, appTemplate);
    created++;
  } else {
    skipped++;
  }

  return { created, skipped };
}

module.exports = { scaffold };
