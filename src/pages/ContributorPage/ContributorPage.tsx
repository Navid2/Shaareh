import { FC } from "react";
import PageComponent from "../../components/PageComponent/PageComponent";
import Image from "../../components/Image/Image";

import ProfilePhotoUrl from "../../assets/dummy/profile-photo.jpg";
import CoverUrl from "../../assets/dummy/post-cover.jpg";

import "./ContributorPage.css";

const ContributorPage: FC = () => {
  return (
    <PageComponent className="contributor-page">
      <div className="profile-card">
        <div className="contributor-profile">
          <Image className="profile-photo" imageURL={ProfilePhotoUrl} edge="circle" hoverEffect/>
          <div className="basic-info">
            <h3 className="full-name">نوید نقی زاده</h3>
            <h5 className="role-description">طراحی و اجرای تارگاه شارح</h5>
          </div>
          <ul className="status-list">
            <li className="status-item">
              <i className="fas fa-user" />
              <p className="status-text">فریلنسر</p>
            </li>
            <li className="status-item">
              <i className="fas fa-graduation-cap"/>
              <p className="status-text">کارشناسی مهندسی برق دانشگاه علم‌و‌صنعت</p>
            </li>
            <li className="status-item">
              <i className="fas fa-link" />
              <p className="status-text">naghizade.com</p>
            </li>
            <li className="status-item">
              <i className="fas fa-at" />
              <p className="status-text">navid.naghizadeh@gmail.com</p>
            </li>
            <li className="status-item">
              <i className="fab fa-instagram"/>
              <p className="status-text">naghizade.navid</p>
            </li>
            <li className="status-item">
              <i className="fab fa-telegram"/>
              <p className="status-text">naghizade0</p>
            </li>
            <li className="status-item">
              <i className="fab fa-whatsapp"/>
              <p className="status-text">9891012312</p>
            </li>
          </ul>
          <div className="user-about">
            <h4>درباره من</h4>
            <p>علاقه مند به شعر و ادب فارسی.</p>
          </div>
        </div>
        <div className="contributions">
          <ul className="contributions-list">
            {
              Array.from([1,1,1,1,1,1,1,1,1,1,1]).map(()=>{
                return(<li className="contribution-item">
                <Image imageURL={CoverUrl} edge="sharp" className="post-cover"/>
                <div className="contribution-info">
                  <h5 className="post-title">خوشا شیراز و وضع بی مثالش</h5>
                  <p className="contributor-role">نویسنده</p>
                </div>
              </li>);
              })
            }
            
          </ul>
        </div>
      </div>
    </PageComponent>
  );
};

export default ContributorPage;
