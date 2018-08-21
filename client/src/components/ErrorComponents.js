import React from "react";

export const ErrorUserName = (props) =>
  <div className="error-text">
      { (props.ErrorInUserName) 
        ?  <p>Username must be between {props.UnameMinLength} and {props.UnameMaxLength} characters.</p>        
        : null
      }
  </div>

export const ErrorPassword = (props) =>
  <div className="error-text">
      { (props.ErrorInPassword) 
        ?  <p>Password must be at least {props.MinPasswordLength} characters long.</p>        
        : null
      }
  </div>

export const ErrorPasswordMatch = (props) =>
  <div className="error-text">
    { (props.ErrorInPasswordMatch) 
      ?  <p>Password and confirmation do not match. Please try again.</p>        
      : null
    }
  </div>

export const ErrorEmail = (props) =>
  <div className="error-text">
    { (props.ErrorInEmail) 
      ?  <p>Please enter a valid email address</p>        
      : null
    }
  </div>

export const ErrorChatEmpty = (props) =>
  <div className="error-text wrong animated jello">
    { (props.ChatEmpty) ?  <p>Message cannot be empty.</p> : null}
  </div>

export const ErrorChatLong = (props) =>
  <div className="error-text wrong animated jello">
    { (props.ChatLong) ? <p>Message must be shorter than {props.MaxChatLength} characters.</p> : null}
  </div>

export const ErrorChatFast = (props) =>
  <div className="error-text wrong animated jello">
    { (props.ChatFast) ? <p>Slow Things Down...You Are Posting Too Fast!</p> : null}
  </div>