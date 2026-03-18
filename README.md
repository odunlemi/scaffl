# scaffl

Scaffold a clean MVC folder structure for Node.js/Express projects in seconds.

- Generates `models/`, `views/`, `controllers/`, and `routes/`, each with a working example file

- Adds an `index.js` entry point

- Plus a root `app.js` to tie it all together

## Usage

### CLI (recommended)

Scaffold into your current directory:

```bash
npx scaffl
```

Scaffold into a specific folder:

```bash
npx scaffl ./my-project
```

### Import as a function

```js
const { scaffold } = require("scaffl");

// Scaffold into current directory
scaffold();

// Scaffold into a specific path
scaffold("/path/to/my-project");
```

---

## Generated Structure

```
app.js
├── models/
│   ├── index.js
│   └── UserModel.js
├── views/
│   ├── index.js
│   └── userView.js
├── controllers/
│   ├── index.js
│   └── userController.js
└── routes/
    ├── index.js
    └── userRoutes.js
```

### What each file does

| File | Purpose |
|------|---------|
| `app.js` | Express app setup, mounts routes at `/api` |
| `models/UserModel.js` | Example data/schema class |
| `views/userView.js` | Formats data for responses |
| `controllers/userController.js` | Handles request logic (CRUD) |
| `routes/userRoutes.js` | Defines route paths and maps to controllers |
| `routes/index.js` | Central router — mounts all route files |
| `*/index.js` | Entry point — exports everything from that folder |

---

## After Scaffolding

Install Express and start building:

```bash
npm init -y
npm install express
node app.js
```

> Existing files are never overwritten. It is safe to run in a project that already has some files.

## License

MIT