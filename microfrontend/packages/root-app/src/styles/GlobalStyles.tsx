import { css, Global } from '@emotion/react'
import { GlobalStyles as BaseStyles } from 'twin.macro'

const customStyles = css`
  .slide-in-bottom {
    -webkit-animation: slide-in-bottom 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94)
      both;
    animation: slide-in-bottom 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94) both;
  }
  .slide-in-bottom-h1 {
    -webkit-animation: slide-in-bottom 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94)
      0.5s both;
    animation: slide-in-bottom 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94) 0.5s
      both;
  }
  .slide-in-bottom-subtitle {
    -webkit-animation: slide-in-bottom 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94)
      0.75s both;
    animation: slide-in-bottom 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94) 0.75s
      both;
  }
  .fade-in {
    -webkit-animation: fade-in 1.2s cubic-bezier(0.39, 0.575, 0.565, 1) 1s both;
    animation: fade-in 1.2s cubic-bezier(0.39, 0.575, 0.565, 1) 1s both;
  }
  .bounce-top-icons {
    -webkit-animation: bounce-top 0.9s 1s both;
    animation: bounce-top 0.9s 1s both;
  }

  @-webkit-keyframes slide-in-bottom {
    0% {
      -webkit-transform: translateY(1000px);
      transform: translateY(1000px);
      opacity: 0;
    }
    100% {
      -webkit-transform: translateY(0);
      transform: translateY(0);
      opacity: 1;
    }
  }
  @keyframes slide-in-bottom {
    0% {
      -webkit-transform: translateY(1000px);
      transform: translateY(1000px);
      opacity: 0;
    }
    100% {
      -webkit-transform: translateY(0);
      transform: translateY(0);
      opacity: 1;
    }
  }
  @-webkit-keyframes bounce-top {
    0% {
      -webkit-transform: translateY(-45px);
      transform: translateY(-45px);
      -webkit-animation-timing-function: ease-in;
      animation-timing-function: ease-in;
      opacity: 1;
    }
    24% {
      opacity: 1;
    }
    40% {
      -webkit-transform: translateY(-24px);
      transform: translateY(-24px);
      -webkit-animation-timing-function: ease-in;
      animation-timing-function: ease-in;
    }
    65% {
      -webkit-transform: translateY(-12px);
      transform: translateY(-12px);
      -webkit-animation-timing-function: ease-in;
      animation-timing-function: ease-in;
    }
    82% {
      -webkit-transform: translateY(-6px);
      transform: translateY(-6px);
      -webkit-animation-timing-function: ease-in;
      animation-timing-function: ease-in;
    }
    93% {
      -webkit-transform: translateY(-4px);
      transform: translateY(-4px);
      -webkit-animation-timing-function: ease-in;
      animation-timing-function: ease-in;
    }
    25%,
    55%,
    75%,
    87% {
      -webkit-transform: translateY(0);
      transform: translateY(0);
      -webkit-animation-timing-function: ease-out;
      animation-timing-function: ease-out;
    }
    100% {
      -webkit-transform: translateY(0);
      transform: translateY(0);
      -webkit-animation-timing-function: ease-out;
      animation-timing-function: ease-out;
      opacity: 1;
    }
  }
  @keyframes bounce-top {
    0% {
      -webkit-transform: translateY(-45px);
      transform: translateY(-45px);
      -webkit-animation-timing-function: ease-in;
      animation-timing-function: ease-in;
      opacity: 1;
    }
    24% {
      opacity: 1;
    }
    40% {
      -webkit-transform: translateY(-24px);
      transform: translateY(-24px);
      -webkit-animation-timing-function: ease-in;
      animation-timing-function: ease-in;
    }
    65% {
      -webkit-transform: translateY(-12px);
      transform: translateY(-12px);
      -webkit-animation-timing-function: ease-in;
      animation-timing-function: ease-in;
    }
    82% {
      -webkit-transform: translateY(-6px);
      transform: translateY(-6px);
      -webkit-animation-timing-function: ease-in;
      animation-timing-function: ease-in;
    }
    93% {
      -webkit-transform: translateY(-4px);
      transform: translateY(-4px);
      -webkit-animation-timing-function: ease-in;
      animation-timing-function: ease-in;
    }
    25%,
    55%,
    75%,
    87% {
      -webkit-transform: translateY(0);
      transform: translateY(0);
      -webkit-animation-timing-function: ease-out;
      animation-timing-function: ease-out;
    }
    100% {
      -webkit-transform: translateY(0);
      transform: translateY(0);
      -webkit-animation-timing-function: ease-out;
      animation-timing-function: ease-out;
      opacity: 1;
    }
  }
  @-webkit-keyframes fade-in {
    0% {
      opacity: 0;
    }
    100% {
      opacity: 1;
    }
  }
  @keyframes fade-in {
    0% {
      opacity: 0;
    }
    100% {
      opacity: 1;
    }
  }
`

const GlobalStyles = () => {
  return (
    <div>
      <BaseStyles />
      <Global styles={customStyles} />
    </div>
  )
}

export default GlobalStyles
