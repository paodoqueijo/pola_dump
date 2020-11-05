import React, { useState, useEffect } from "react";
import HeaderNav from "./components/HeaderNav";
import Footer from "./components/Footer";
import Gallery from "./components/Gallery";
import Contact from "./components/Contact";
import About from "./components/About";
import Projects from "./components/Projects";
import Admin from "./components/Admin/Admin";
import { projectFirestore } from "./firebase/config";
import Modal from "./components/Modal";

import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import MobileHeader from "./components/MobileHeader";

function App() {
  const [projects, setProjects] = useState(undefined);
  const [about, setAbout] = useState();
  const [selectedImg, setSelectedImg] = useState(null);
  const [loggedIn, setLoggedIn] = useState(false);

  useEffect(() => {
    const observer = projectFirestore.collection("root").onSnapshot((snap) => {
      const pages = snap.docs.map((doc) => {
        return { name: doc.id, ...doc.data() };
      });

      const about = pages.filter((page) => page.name === "About")[0];
      setAbout(about);

      const prjs = pages.filter(
        (page) => page.name !== "Overview" && page.name !== "About"
      );

      if(prjs.length === 0 || !prjs) {
        setProjects(undefined);
      } else {
        setProjects(prjs);
      }




    });
    return () => observer();
  }, []);

  return (
    <div className="App">
      <Router>
        {selectedImg && (
          <Modal selectedImg={selectedImg} setSelectedImg={setSelectedImg} />
        )}
        <div className="content">
          <HeaderNav projects={projects} />
          <MobileHeader />{" "}
          <main>
            <Switch>
              {projects &&
                projects.map((project, idx) => (
                  <Route key={idx} path={`/projects/${project.name}`}>
                    <Projects
                      setSelectedImg={setSelectedImg}
                      project={project}
                    />
                  </Route>
                ))}
              <Route path="/about">
                <About about={about} />
              </Route>
              <Route path="/contact">
                <Contact />
              </Route>
              <Route path="/admin">
                <Admin
                  loggedIn={loggedIn}
                  setLoggedIn={setLoggedIn}
                  about={about}
                  projects={projects}
                />
              </Route>
              <Route path="/">
                <Gallery setSelectedImg={setSelectedImg} pageName="Overview" />
              </Route>
            </Switch>
          </main>
          <Footer />
        </div>
      </Router>
    </div>
  );
}

export default App;
