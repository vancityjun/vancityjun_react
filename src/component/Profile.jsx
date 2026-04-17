import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faGithub, faLinkedin } from '@fortawesome/free-brands-svg-icons'
import profileImage from '../img/jun-developer.png'

const Profile = () => {
  return (
    <div className="blog-slider__item swiper-slide profile" data-hash="slide0">
      <div className="blog-slider__img">
        {/* Only backgroundImage is dynamic — all other styles live in slide.scss */}
        <div
          className="project-header profile-header"
          style={{ backgroundImage: `url(${profileImage})` }}
        ></div>
      </div>
      <div className="content_wrapper">
        <div className="blog-slider__content cf">
          <div className="blog-slider__title">Jun Lee</div>
          <div className="blog-slider__text">
            <q>
              Full-stack Software Engineer who specializes in building
              fast, scalable web applications from the UI down to the API.
              I take ownership of what I ship and care about the product,
              not just the code.
            </q>
          </div>
          <div className="info">
            <p>
              <a href="mailto:vancityjun@gmail.com">vancityjun@gmail.com</a>
            </p>
            <div className="sns">
              <a
                href="https://github.com/vancityjun"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GitHub"
              >
                <FontAwesomeIcon icon={faGithub} />
              </a>
              <a
                href="https://www.linkedin.com/in/vancityjun"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
              >
                <FontAwesomeIcon icon={faLinkedin} />
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profile
