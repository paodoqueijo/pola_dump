import React from 'react';
import '../styles/gallery.scss';
import '../styles/article.scss';
import '../styles/projects.scss';
import Gallery from './Gallery';

function Projects({ project, setSelectedImg }) {
  return (
    <section className="Projects">
      <div className="article-text">
        <h2>{project.name}</h2>
        <p dangerouslySetInnerHTML={{ __html: project.text }}></p>
      </div>
      <Gallery setSelectedImg={setSelectedImg} pageName={project.name} />
    </section>
  );
}

export default Projects;
