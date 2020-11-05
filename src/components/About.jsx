import React from 'react';
import '../styles/about.scss';
import '../styles/article.scss';

function About({ about }) {
  return (
    <section className="About">
      <div className="article-text">
        <h2>{about.title}</h2>
        <p dangerouslySetInnerHTML={{ __html: about.text }}></p>
      </div>
      <div className="portraits">
        <picture>
          <img  width="250" src={about.image}alt="portrait"></img>
        </picture>
      </div>
    </section>
  );
}

export default About;