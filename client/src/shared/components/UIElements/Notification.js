import classes from './Notification.module.css';
import {useSelector} from "react-redux"
import React from 'react';

const Notification = () => {
  const notification = useSelector((state) => state.ui.notification);
  if(!notification){
    return <></>;
  }
  let specialClasses = '';

  if (notification.status === 'error') {
    specialClasses = classes.error;
  }
  if (notification.status === 'success') {
    specialClasses = classes.success;
  }

  const cssClasses = `${classes.notification} ${specialClasses}`;

  return (
    <section className={cssClasses}>
      <h2>{notification.title}</h2>
      <p>{notification.message}</p>
    </section>
  );
};

export default Notification;
