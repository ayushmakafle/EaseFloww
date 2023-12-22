// LearnMorePage0.js

import React from 'react';
// import MainNavbar from '../components/Navbar';
import '../styles/LearnMorePage0.css';
import Footer from '../components/footer';

const LearnMorePage0 = () => {
  return (
    <>
      {/* <MainNavbar /> */}
      <div className="page-container">
        <h1 className="page-heading">Understanding Menstruation Pain</h1>

        <div className="paragraph-container">
          <div className="text-box">
            <p className="page-paragraph">
              Menstruation, often referred to as a woman's "period," is a natural physiological
              process that most women experience on a monthly basis. It is a crucial aspect of the
              female reproductive system, involving the shedding of the uterine lining in the absence
              of pregnancy.
            </p>
          </div>
          <img
            src="https://img.freepik.com/free-photo/good-looking-feminine-girl-holds-clean-sanitary-napkin_176532-12421.jpg?w=996&t=st=1702912714~exp=1702913314~hmac=3ad607af56917599575966a832c484c4cb7cdfdf99810f3f85e952f1e235288b"
            alt="Image 1"
            className="paragraph-image"
          />
        </div>

        <div className="paragraph-container reverse">
          <img
            src="https://img.freepik.com/free-vector/female-reproductive-system-illustrated_23-2148654102.jpg?w=740&t=st=1702912643~exp=1702913243~hmac=6f8058f6afb2bc0ac025367589543bda01b955f1448fd0331db2390f9662b9c4"
            alt="Image 2"
            className="paragraph-image2"
          />
          <div className="text-box">
            <p className="page-paragraph">
              Alongside menstruation, many women also experience menstrual pain, also known as
              dysmenorrhea. This pain can range from mild discomfort to severe cramps and is often
              accompanied by various symptoms such as bloating, fatigue, and mood swings.
            </p>
          </div>
        </div>

        <div className="paragraph-container">
          <div className="text-box">
            <p className="page-paragraph">
              Menstrual pain is a unique and personal experience, and its intensity varies among
              women. Some may barely notice it, while others may find it challenging to engage in
              daily activities. It's essential to recognize that menstruation and its associated
              discomfort are normal physiological processes that women navigate throughout their lives.
            </p>
          </div>
          <img
            src="https://img.freepik.com/free-photo/young-woman-sitting-bed-morning_23-2148298131.jpg?w=996&t=st=1702912719~exp=1702913319~hmac=0fecf7a683789f2080208bc4bfbd95efcaf740b44e439888cac44e4bc5af5c4d"
            alt="Image 3"
            className="paragraph-image"
          />
        </div>

        <div className="paragraph-container reverse">
          <img
            src="https://img.freepik.com/free-photo/young-brunette-pink-sweater-isolated-purple-wall_343596-5669.jpg?w=996&t=st=1702912727~exp=1702913327~hmac=086945595d4762ce42618f162e7edf7373bc199e97b1abdb9e88beeb5273c04a"
            alt="Image 4"
            className="paragraph-image2"
          />
          <div className="text-box">
            <p className="page-paragraph">
              Understanding menstruation and its pain is crucial for promoting empathy and support
              for women. By acknowledging the naturalness of this process, we can foster a more
              compassionate and informed perspective on women's health.
            </p>
          </div>
        </div>

      </div>
      <Footer />
    </>
  );
};

export default LearnMorePage0;
