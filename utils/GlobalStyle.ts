import { createGlobalStyle } from 'styled-components'

const GlobalStyle = createGlobalStyle`
  div, div:before, div:after {
    box-sizing: border-box;
  }
  .TooltipText {
    .inner {
      max-width: 280px;
      padding: 12px !important;
      background: #222222;
      box-shadow: 0px 2px 16px rgba(0, 0, 0, 0.5);
      border-radius: 4px;
      font-size: 12px;
      line-height: 150%;
      color: rgba(255, 255, 255, 0.9);
      a {
        display: inline-box;
        margin-top: 8px;
        color: #d1ff52;
        line-height: 16px;
        span {
          vertical-align: middle;
        }
      }
    }
  }
  #geist-ui-modal {
    .content {
      width: 600px;
    }
  }
  .BlackModal {
    padding: 0 !important;
    .modal-header {
      padding: 14px 24px;
      font-size: 16px;
      line-height: 22px;
      text-align: center;
      color: rgba(255, 255, 255, 0.9);
      box-shadow: 0px 1px 0px rgba(255, 255, 255, 0.1);
      text-align: left;
      > h2 {
        font-size: 16px;
        line-height: 22px;
        text-align: center;
        color: rgba(255, 255, 255, 0.9);
      }
      > p {
        margin-left: 10px;
      }
      >.close {
        float: right;
        button {
          margin-top: 5px;
          padding: 0;
          background: none !important;
          color: #ffffff !important;
        }
      }
    }
    .modal-content {
      .content {
        margin-left: 0;
        font-size: 14px;
        line-height: 20px;
        color: rgba(255, 255, 255, 0.9);
      }
      .green {
        color: #d1ff52;
      }
      a {
        color: #d1ff52;
        text-decoration-line: underline;
      }
    }
    .modal-footer {
      padding: 0 22px 22px 22px;
      text-align: right;
      .btn {
        margin-right: 8px;
        display: inline-block;
        padding: 5px 25px;
        background: #D1FF52;
        border-radius: 4px;
        font-size: 14px;
        line-height: 20px;
        &:last-of-type {
          margin-right: 0;
        }
        &.passive {
          color: rgba(0, 0, 0, 0.9);
          background: rgba(255, 255, 255, 0.5);
          border-radius: 4px;
          &:hover, &:focus {
            color: #000;
            background: #fafafa !important;
          }
        }
      }
    }
  }
`

export default GlobalStyle
