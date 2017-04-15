import React, {PureComponent} from 'react'
import css from '../../lib/css'
import './_svgs.sass'

class SVG extends PureComponent {
  constructor(props) {
    super(props)
    this.setType()
  }

  setType() {
    const {type} = this.props

    if (!type)
      return

    var title,
      path,
      viewbox = "0 0 32 32"

    switch (type) {
      case 'comments':
        title = 'Comments'
        path = <path d="M27.77 15.273c0 4.568-5.32 8.27-11.884 8.27-1.713 0-3.34-.254-4.81-.706l-4.83 2.98c-.24.125-.377.014-.305-.247l1.136-4.746C5.166 19.356 4 17.408 4 15.274 4 10.704 9.322 7 15.886 7c6.564 0 11.884 3.704 11.884 8.273"/>
        break

      case 'time':
        title = 'Time'
        path = <path d="M17 14.277V9.515C17 9.24 16.758 9 16.483 9H15.5c-.273 0-.5.24-.5.515v4.762c-.3.174-.548.422-.722.723H11.5c-.275 0-.5.273-.5.548v.952c0 .275.225.5.5.5h2.778c.346.595.984 1 1.722 1 1.105 0 2-.896 2-2 0-.74-.404-1.376-1-1.723M16 25c-4.97 0-9-4.03-9-9s4.03-9 9-9 9 4.03 9 9-4.03 9-9 9m0-21C9.383 4 4 9.382 4 16c0 6.617 5.383 12 12 12s12-5.383 12-12c0-6.618-5.383-12-12-12"/>
        break

      case 'views':
        title = 'Views'
        path = <path d="M15.953 18.078c-.977 0-1.77-.793-1.77-1.768 0-.976.793-1.772 1.77-1.772.978 0 1.77.796 1.77 1.772 0 .975-.792 1.768-1.77 1.768m.06-6.412c-2.565 0-4.644 2.076-4.644 4.644 0 2.564 2.077 4.644 4.642 4.644 2.56 0 4.64-2.08 4.64-4.644 0-2.568-2.08-4.644-4.64-4.644m-.01 12.98C9.372 24.646 4 16.323 4 16.323S9.374 8 16.002 8c6.628 0 12 8.323 12 8.323s-5.372 8.323-12 8.323"/>
        break

      case 'shares':
        title = 'Shares'
        path = <path d="M23.39 20c-.904 0-1.72.352-2.342.915l-6.41-3.782c.084-.365.143-.74.143-1.133 0-.404-.06-.79-.152-1.167l6.393-3.77c.625.576 1.453.937 2.37.937 1.936 0 3.5-1.566 3.5-3.5S25.327 5 23.39 5c-1.934 0-3.5 1.566-3.5 3.5 0 .29.047.57.114.84l-6.254 3.687c-.895-1.158-2.282-1.918-3.86-1.918C7.19 11.11 5 13.295 5 16c0 2.702 2.19 4.89 4.89 4.89 1.59 0 2.99-.77 3.882-1.945l6.24 3.68c-.07.282-.12.57-.12.875 0 1.934 1.564 3.5 3.5 3.5 1.933 0 3.5-1.566 3.5-3.5s-1.567-3.5-3.5-3.5"/>
        break

      case 'categories':
      case 'tags':
        title = 'Tags'
        path = <path d="M18.13 24.214c-2.247-3.07-5.294-4.75-5.294-6.7 0-2.526 3.504-4.322 5.293-1.582 1.9-2.74 5.29-.944 5.29 1.583 0 1.95-3.047 3.628-5.293 6.7m-7.716-13.8c-.78.78-2.046.78-2.827 0-.78-.782-.78-2.048 0-2.83.78-.78 2.047-.78 2.828 0 .78.782.78 2.048 0 2.83m17.234 7.327L14.257 4.354C14.062 4.16 13.677 4 13.4 4H4.505C4.23 4 4 4.225 4 4.5v8.9c0 .273.16.66.356.853l13.39 13.39c.195.193.514.193.707 0l9.194-9.194c.193-.196.194-.514 0-.71"/>
        break

      case 'facebook':
        title = 'Facebook'
        path = <path d="M18.3125 6.625H23V1h-4.6875C14.6937 1 11.75 3.9438 11.75 7.5625v2.8125H8V16h3.75v15h5.625V16h4.6875L23 10.375h-5.625V7.5625c0-.508.4294-.9375.9375-.9375z"/>
        break

      case 'messenger':
        title = 'Facebook Messenger'
        path = <path d="M16 1C7.716 1 1 7.257 1 14.975c0 4.398 2.18 8.32 5.59 10.883v5.328l5.107-2.82c1.363.38 2.807.584 4.303.584 8.284 0 15-6.257 15-13.975S24.284 1 16 1zm1.49 18.82l-3.82-4.1-7.453 4.1 8.2-8.758 3.912 4.1 7.36-4.1-8.2 8.758z"/>
        break

      case 'post':
        title = 'Post'
        path =  <g>
                  <path d="M24.987 4.0043c1.1502 0 2.083.933 2.083 2.083v19.86c0 1.1495-.9333 2.083-2.083 2.083H5.675l1.252 1.2523V2.7522l-1.252 1.252h19.312zM4.4227 1.5v29.0348H24.987c2.533 0 4.5874-2.055 4.5874-4.5874v-19.86c0-2.5333-2.054-4.5874-4.5874-4.5874H4.4227z"/>
                  <path d="M8.2348 8.4256c.6915 0 1.2522-.5607 1.2522-1.2522 0-.6916-.5607-1.2522-1.2522-1.2522H3.2522C2.5606 5.9212 2 6.4818 2 7.1734c0 .6915.5606 1.2522 1.2522 1.2522h4.9826zm0 4.422c.6915 0 1.2522-.5607 1.2522-1.2522 0-.6916-.5607-1.2522-1.2522-1.2522H3.2522c-.6916 0-1.2522.5606-1.2522 1.2522 0 .6915.5606 1.2522 1.2522 1.2522h4.9826zm0 4.4218c.6915 0 1.2522-.5606 1.2522-1.252 0-.6917-.5607-1.2523-1.2522-1.2523H3.2522C2.5606 14.765 2 15.326 2 16.0176c0 .6915.5606 1.252 1.2522 1.252h4.9826zm0 4.4214c.6915 0 1.2522-.5606 1.2522-1.2522 0-.6915-.5607-1.2522-1.2522-1.2522H3.2522C2.5606 19.1864 2 19.747 2 20.4386s.5606 1.2522 1.2522 1.2522h4.9826zm0 4.4225c.6915 0 1.2522-.5606 1.2522-1.2522 0-.6912-.5607-1.252-1.2522-1.252H3.2522C2.5606 23.609 2 24.1698 2 24.861c0 .6917.5606 1.2523 1.2522 1.2523h4.9826z"/>
                </g>
        break

      case 'linkedin':
        title = 'LinkedIn'
        path = <path d="M12 9h5.535v2.837h.079C18.384 10.456 20.269 9 23.078 9 28.92 9 30 12.637 30 17.367V27h-5.769v-8.54c0-2.037-.042-4.657-3.001-4.657-3.005 0-3.463 2.218-3.463 4.509V27H12V9zM2 9h6v18H2M8 4c0 1.657-1.343 3-3 3S2 5.657 2 4s1.343-3 3-3 3 1.343 3 3z"/>
        break

      case 'phone':
        title = 'Phone'
        path = <path d="M4.007 7.534L7.26 4.28c.447-.446 1.166-.338 1.534.176l2.78 3.875c.37.518.27 1.27-.178 1.717l-2.37 2.37c1.18 1.648 2.628 3.43 4.55 5.35 1.92 1.92 3.702 3.37 5.35 4.55l2.37-2.37c.447-.447 1.234-.514 1.748-.144l3.822 2.728c.514.368.64 1.107.193 1.554l-3.257 3.254s-5.63.494-12.962-6.837C3.513 13.165 4.008 7.535 4.008 7.535"/>
        break

      case 'medium':
        title = 'Medium'
        path = <path d="M21.756 24.59l8.426 4.186c.468.176.818.076.818-.562V9.52l-9.244 15.07zM14.92 12.757l5.813-9.503c.202-.316.55-.216.7-.092l9.386 4.655c.175.088.116.335.116.335l-9.402 15.236-6.615-10.63zM11.87 19.67l9.188 4.55L11.87 9.277c-.014-.024 0 10.393 0 10.393zM11 28.115c0 .616-.212 1.004-.987.616l-8.218-4.097C1.33 24.4 1 24.118 1 23.597V3.643c0-.407.158-.6.72-.407l9.225 4.68c.034.016.055.05.055.087v20.112z"/>
        break

      case 'flickr':
        title = 'Flickr'
        path = <path d="M32.003 16c0 8.838-7.164 16-16.002 16S0 24.837 0 16C0 7.162 7.164 0 16 0c8.84 0 16.003 7.163 16.003 16zM14 16c0-2.76-2.24-5-5-5s-5 2.24-5 5 2.24 5 5 5 5-2.24 5-5zm14 0c0-2.76-2.24-5-5-5s-5 2.24-5 5 2.24 5 5 5 5-2.24 5-5z"/>
        break

      case 'skype':
        title = 'Skype'
        path = <g>
                <path d="M4.75 2.75C7.29.914 10.885.757 13.59 2.325c3.053-.53 6.28-.026 9 1.458 3.04 1.632 5.426 4.436 6.538 7.704.763 2.21.94 4.614.543 6.918.98 1.72 1.32 3.788.92 5.727-.41 2.138-1.73 4.077-3.56 5.268-2.52 1.7-5.99 1.795-8.62.273-2.93.503-6.01.067-8.66-1.285C6.66 26.84 4.21 24.102 3 20.87c-.87-2.308-1.087-4.848-.674-7.278-1-1.748-1.322-3.862-.896-5.83.423-2.01 1.64-3.836 3.32-5.013zm1.375 1.623C4.425 5.478 3.34 7.466 3.36 9.495c-.026 1.332.475 2.604 1.184 3.71-.46 2.107-.425 4.334.254 6.39 1.058 3.345 3.7 6.135 6.978 7.384 2.222.87 4.694.98 7.017.47.677.39 1.366.79 2.134.98 1.928.52 4.09.02 5.588-1.3 1.534-1.31 2.35-3.41 2.076-5.41-.11-1.06-.58-2.04-1.13-2.94.47-2.14.42-4.41-.29-6.49-1.11-3.42-3.89-6.23-7.28-7.41-2.13-.764-4.47-.834-6.68-.35-.56-.326-1.12-.67-1.75-.87-1.76-.597-3.78-.34-5.322.7z"/>
                <path d="M14.176 7.596c2-.302 4.105.004 5.89.97.78.434 1.534 1.02 1.896 1.86.237.55.263 1.273-.173 1.735-.48.49-1.25.64-1.88.43-.74-.3-1.1-1.07-1.72-1.53-.79-.64-1.84-.82-2.83-.8-.72.03-1.5.2-2.02.73-.49.52-.67 1.41-.19 1.99.44.52 1.14.71 1.77.89 1.21.304 2.43.547 3.64.834 1.26.287 2.536.84 3.37 1.87 1.44 1.86 1.113 4.815-.674 6.34-1.43 1.266-3.42 1.616-5.27 1.628-1.98-.03-4.093-.432-5.614-1.785-.76-.69-1.4-1.73-1.17-2.79.25-1.054 1.7-1.454 2.52-.805.63.502.97 1.27 1.574 1.794.726.663 1.735.926 2.7.903.946.026 1.95-.264 2.6-.984.44-.488.675-1.23.39-1.85-.236-.586-.84-.905-1.417-1.06-1.065-.28-2.138-.535-3.203-.816-1.17-.285-2.387-.55-3.393-1.244-.78-.52-1.38-1.335-1.57-2.262-.32-1.455-.09-3.134.97-4.245.967-1.078 2.4-1.578 3.798-1.793z"/>
              </g>
        break

      case 'email':
        title = 'Email'
        path = <path d="M4 8l12 12L28 8H4zm18 8l6 6V10l-6 6zM4 22l6-6-6-6v12zm12 0l-5-5-7 7h24l-7-7-5 5z"/>
        break

      case 'twitter':
        title = 'Twitter'
        path = <path d="M32 6.075c-1.1748.525-2.4435.8748-3.7683 1.0308 1.3558-.813 2.3936-2.1 2.8865-3.6308-1.2688.75-2.6745 1.3-4.1683 1.594C25.75 3.794 24.0444 3 22.1567 3c-3.6243 0-6.5617 2.938-6.5617 6.5627 0 .512.056 1.012.169 1.494-5.455-.275-10.292-2.888-13.5284-6.8617-.563.969-.887 2.1-.887 3.2998 0 2.275 1.156 4.287 2.9186 5.4628-1.0748-.031-2.0866-.331-2.9744-.819v.081c0 3.181 2.2625 5.8378 5.268 6.4368-.55.15-1.1308.231-1.7307.231-.4248 0-.8307-.044-1.2367-.119.838 2.606 3.2624 4.5058 6.13 4.5628-2.2497 1.762-5.0742 2.813-8.1546 2.813-.531 0-1.0498-.031-1.5687-.094C2.9125 27.919 6.3608 29 10.067 29 22.14 29 28.7447 18.9944 28.7447 10.3197c0-.287-.006-.569-.019-.85 1.2808-.919 2.3936-2.075 3.2744-3.3938v-.001z"/>
        break

      case 'google':
        title = 'Google'
        viewbox = "0 0 37 32"
        path = <path d="M11.6622 14.6437v4.002h6.6146c-.2646 1.718-1.9976 5.0327-6.6146 5.0327-3.9802 0-7.2307-3.2998-7.2307-7.366 0-4.066 3.2505-7.3658 7.2307-7.3658 2.269 0 3.7798.9667 4.6457 1.797l3.1634-3.049c-2.033-1.8966-4.6674-3.049-7.8103-3.049C5.2116 4.6527 0 9.8642 0 16.315c0 6.4508 5.2115 11.661 11.661 11.661 6.7292 0 11.196-4.7315 11.196-11.3964 0-.7663-.0858-1.3527-.1866-1.9334H11.66l.0022-.0023zM36.5714 14.2857H33.143V10.857h-3.4287v3.4287h-3.4286v3.4286h3.4286v3.4286h3.4286v-3.4287h3.4284"/>
        break

      case 'instagram':
        title = 'Instagram'
        path =  <g>
                  <path d="M16.0084 3.702c4.01 0 4.4848.0177 6.0616.088 1.466.0647 2.257.3103 2.785.5156.698.27 1.2016.598 1.723 1.1194.5282.5278.85 1.0256 1.1258 1.723.2054.528.4512 1.324.516 2.7836.0702 1.5825.088 2.0568.088 6.059s-.0178 4.4822-.088 6.059c-.0648 1.4654-.3106 2.2557-.516 2.7835-.2702.698-.5976 1.201-1.12 1.723-.528.528-1.0262.85-1.7232 1.125-.528.206-1.3254.451-2.785.516-1.5834.0707-2.058.088-6.0625.088-4.004 0-4.484-.0172-6.062-.088-1.466-.0643-2.257-.31-2.785-.5152-.698-.27-1.201-.5972-1.724-1.1194-.528-.528-.85-1.026-1.126-1.7223-.205-.528-.451-1.3247-.516-2.7835-.07-1.5823-.088-2.057-.088-6.059 0-4.002.018-4.482.088-6.059.065-1.4652.311-2.2555.516-2.7834.27-.6972.599-1.201 1.12-1.723.528-.528 1.026-.8493 1.724-1.125.528-.2052 1.325-.451 2.785-.5155 1.577-.0704 2.053-.088 6.063-.088h.001zm0-2.701c-4.0747 0-4.584.0178-6.1853.088-1.594.0704-2.691.3282-3.64.6976-.99.3862-1.829.8962-2.661 1.7343-.838.832-1.349 1.669-1.735 2.654-.369.955-.627 2.044-.698 3.638C1.018 11.419 1 11.928 1 16.001c0 4.0724.0178 4.5815.0882 6.1818.0703 1.5938.3283 2.6897.698 3.6384.3873.99.8966 1.8282 1.7352 2.6597.832.831 1.6706 1.348 2.6556 1.728.9558.369 2.0458.627 3.6405.697 1.6002.07 2.1105.088 6.1853.088s4.585-.018 6.1854-.088c1.5946-.0706 2.6912-.328 3.6405-.6978.985-.3806 1.8235-.8963 2.6555-1.7288.832-.8327 1.349-1.67 1.7297-2.654.369-.9555.627-2.045.697-3.6387.07-1.599.088-2.109.088-6.1817s-.018-4.5815-.0886-6.182c-.0703-1.5936-.3283-2.6895-.698-3.6382-.3695-.996-.8797-1.8333-1.7174-2.666-.832-.8314-1.6706-1.348-2.6556-1.7285-.9558-.369-2.0458-.627-3.6404-.697-1.606-.076-2.116-.094-6.191-.094l-.001.001z"/>
                  <path d="M16 8.2947c-4.2534 0-7.7053 3.451-7.7053 7.7053 0 4.2544 3.451 7.7053 7.7053 7.7053 4.2544 0 7.7053-3.451 7.7053-7.7053 0-4.2534-3.451-7.7053-7.7053-7.7053zm0 12.703c-2.76 0-4.9978-2.2377-4.9978-4.9977 0-2.76 2.2378-4.9978 4.9978-4.9978S20.9978 13.24 20.9978 16 18.76 20.9978 16 20.9978zM25.808 7.99c0 .9937-.8052 1.799-1.799 1.799-.9937 0-1.799-.8053-1.799-1.799 0-.9938.8053-1.799 1.799-1.799.9938 0 1.799.8053 1.799 1.799z"/>
                </g>
        break

      case 'quote':
        title = 'Quote'
        path = <path d="M8.0242 13c3.8623 0 6.9932 3.134 6.9932 7s-3.131 7-6.9932 7C4.162 27 1.031 23.866 1.031 20L1 19C1 11.268 7.262 5 14.9865 5v4c-2.6685 0-5.177 1.04-7.0642 2.929-.3637.364-.6943.751-.994 1.157.3566-.056.7233-.086 1.096-.086zM24.0068 13C27.869 13 31 16.134 31 20s-3.131 7-6.9932 7c-3.8623 0-6.9933-3.134-6.9933-7l-.031-1c0-7.732 6.262-14 13.9865-14v4c-2.6684 0-5.177 1.04-7.064 2.929-.3638.364-.6945.751-.9942 1.157.3577-.056.7233-.086 1.096-.086z"/>
        break

      case 'pin':
        title = 'Pin'
        path = <path d="M9.29 14.005C9.103 13.37 9 12.697 9 12c0-3.866 3.134-7 7-7s7 3.134 7 7c0 .695-.1 1.367-.29 2-.13.433-6.71 15-6.71 15S9.43 14.47 9.29 14.005zM16 16.1c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4z"/>
        break

      // case 'plane':
      //   title = 'Plane'
      //   path = <path d="M27 21v-2l-9-6V6s0-2-2-2-2 2-2 2v7l-9 6v2l9-3v5.6L11 26v2l5-2 5 2v-2l-3-2.4V18l9 3z"/>
      //   break

      case 'copilot':
        title = 'Co Pilot'
        path =  <g>
                  <path d="M16 6.28c3.57 0 7.407 1.188 10.527 3.26 2.723 1.807 4.193 3.847 4.193 4.848 0 .492-.34 1.727-3.498 2.552l-.956.25v3.943C23.363 23.96 20.973 25.306 16 25.306S8.637 23.96 5.734 21.133v-3.945l-.956-.248c-3.157-.825-3.498-2.06-3.498-2.552 0-1 1.47-3.04 4.193-4.85C8.593 7.47 12.43 6.28 16 6.28M16 5C7.374 5 0 11.13 0 14.388c0 2.097 2.353 3.24 4.454 3.79v3.49c3.034 3.034 5.72 4.918 11.546 4.918 5.825 0 8.512-1.884 11.546-4.918v-3.49c2.102-.55 4.454-1.693 4.454-3.79C32 11.13 24.626 5 16 5"/>
                  <path d="M14.42 11.603c.305-.558.898-.938 1.58-.938s1.275.38 1.58.938h6.093l-1.28 1.728H17.58c-.305.56-.898.94-1.58.94s-1.275-.38-1.58-.94H9.607l-1.28-1.725h6.09zm11.043 8.782s-3.33-.762-9.463-.762c-6.134 0-9.464.762-9.464.762v-2.593s2.667-.744 9.464-.744c6.797 0 9.463.744 9.463.744v2.593z"/>
                </g>
        break

      case 'fingerprint':
        title = 'Fingerprint'
        path = <path d="M14.738 20.396c-.202 3.11-1.032 5.91-2.467 8.32-.07.126-.22.205-.38.205-.06 0-.13-.01-.19-.04l-.89-.45c-.09-.04-.15-.12-.18-.21-.02-.09-.01-.2.05-.29 1.31-2.15 2.07-4.67 2.27-7.5.02-.22.21-.4.43-.4h1c.11 0 .21.04.28.117.07.075.11.174.1.28m-6.87-8.55l-.8-.62c-.06-.05-.14-.08-.22-.08-.12 0-.22.06-.29.17-.96 1.603-1.5 3.43-1.55 5.29C5 16.647 5 18.9 5 18.9c0 1.226-.108 2.4-.33 3.584-.045.236.075.553.262.693l.938.702c.057.04.116.06.17.06.095 0 .166-.07.196-.2.38-1.58.564-3.17.564-4.85V16.9c0-1.55.408-3.09 1.18-4.45.112-.197.062-.47-.113-.604M15.9 3.8c1.088 0 2.18.14 3.244.413.036.01.073.014.112.014.19 0 .374-.118.444-.285l.39-.935c.04-.1.04-.202-.003-.292-.042-.087-.12-.15-.22-.177C18.582 2.182 17.247 2 15.9 2 7.684 2 1 8.685 1 16.9c0 .843.078 1.704.233 2.56.03.17.17.288.343.288.035 0 .072-.005.107-.015l.966-.28c.21-.06.35-.293.32-.517-.12-.693-.17-1.377-.17-2.036 0-7.223 5.87-13.1 13.1-13.1m.93 23.433l-1.11-.228c-.2 0-.41.128-.49.305-.2.422-.41.823-.62 1.2-.06.096-.07.203-.04.3.03.096.09.174.18.22l.9.46c.06.03.125.046.192.046.16 0 .3-.08.374-.21.29-.524.567-1.084.82-1.665.04-.09.04-.18 0-.26-.043-.08-.123-.14-.224-.16m-8.4-18.23c-.075.07-.113.16-.108.26 0 .098.05.188.14.254l.793.62c.08.06.18.1.29.1.13 0 .252-.045.342-.125 1.67-1.48 3.807-2.295 6.023-2.295 1.896 0 3.717.58 5.27 1.69.08.06.183.09.29.09.13 0 .25-.05.33-.13l.72-.727c.07-.075.11-.17.1-.27-.01-.096-.06-.183-.14-.243-1.91-1.45-4.19-2.22-6.58-2.22-2.79 0-5.45 1.065-7.49 3m15.9 1.18c-.09 0-.18.04-.25.11l-.72.72c-.16.16-.175.44-.04.625 1.11 1.554 1.7 3.375 1.7 5.27v1.99c0 1.77-.205 3.48-.606 5.084-.053.217.074.443.285.503l.92.265c.023.007.05.01.076.01.2 0 .43-.18.48-.37.42-1.743.64-3.59.64-5.495v-2c0-2.395-.77-4.672-2.224-6.583-.063-.08-.16-.13-.26-.13m-1.67-6.55c-.054-.025-.11-.04-.167-.04-.14 0-.276.093-.335.233l-.38.92c-.08.207.01.457.21.56C26.3 7.57 29 12.02 29 16.9c0 .67-.058 1.362-.173 2.06-.037.224.107.456.32.52l.965.276c.034.01.07.015.106.015.173 0 .314-.12.345-.29.157-.86.237-1.73.237-2.58 0-5.62-3.128-10.7-8.163-13.27M15.9 10c-3.7 0-6.727 2.894-6.893 6.59-.005.056-.007.31-.007.31v2.002c0 2.584-.463 4.974-1.376 7.104-.092.215-.018.5.164.637l.826.618c.062.05.13.08.2.08.113 0 .213-.07.266-.18 1.14-2.46 1.72-5.23 1.72-8.24V16.9c0-2.812 2.288-5.1 5.1-5.1s5.1 2.29 5.1 5.1v2.002c0 3.206-.644 6.136-1.912 8.705-.1.203-.023.44.174.54l.908.462c.057.02.118.04.182.04.152 0 .29-.09.355-.22 1.39-2.82 2.093-6.03 2.093-9.54v-2c0-3.81-3.095-6.9-6.9-6.9m0 4c-1.572 0-2.9 1.32-2.9 2.9v.5c0 .22.18.4.4.4h1c.22 0 .4-.18.4-.4v-.5c0-.59.514-1.1 1.1-1.1.586 0 1.1.51 1.1 1.1v2c0 1.94-.243 3.81-.72 5.56-.03.1-.016.21.037.29.052.08.136.14.237.16l.995.212c.02.01.05.01.08.01.19 0 .37-.13.42-.31.49-1.855.74-3.85.74-5.94 0-.02.13-2.08-.17-2.954-.43-1.16-1.52-1.94-2.73-1.94"/>
        break

      // case 'bed':
      //   title = 'Bed'
      //   path = <path d="M3 24h3v1c0 .552-.448 1-1 1H4c-.552 0-1-.448-1-1v-1zm2-14c0-.55.45-1 1-1h4c.55 0 1 .45 1 1v3h2v-3c0-.55.45-1 1-1h4c.55 0 1 .45 1 1v3h2V8.5C21 7.048 19.984 6 18.5 6h-13C4 6 3 7.032 3 8.5V13h2v-3zm13 15c0 .552.448 1 1 1h1c.552 0 1-.448 1-1v-1h-3v1zm2-11H4c-1.1 0-2 .9-2 2v7h20v-7c0-1.1-.9-2-2-2zm9.575-2.468l-1.9-4.064C27.58 7.21 27.275 7 27 7h-2c-.275 0-.58.21-.675.468l-1.9 4.064c-.096.257.05.468.325.468H28v1c0 .275.225.5.5.5.274 0 .5-.225.5-.5v-1h.25c.274 0 .42-.21.325-.468zM28 24h-1.156V13h-1.688v11H24c-.552 0-1 .448-1 1v1h6v-1c0-.552-.448-1-1-1z"/>
      //   break

      case 'stopover':
        title = 'Stopover'
        path =  <g>
                  <path d="M22.562 7.036c0-3.72-3.015-6.736-6.737-6.736-3.72 0-6.738 3.016-6.738 6.736 0 1.23.337 2.377.91 3.37H9.99l5.835 11.788 5.838-11.79h-.01c.578-.99.91-2.14.91-3.368m-6.735 3.368c-1.86 0-3.36-1.508-3.36-3.368 0-1.86 1.51-3.37 3.37-3.37s3.37 1.51 3.37 3.37-1.51 3.368-3.37 3.368"/>
                  <path d="M15.07 29.288c.132.102.286.18.458.223.67.17 1.35-.23 1.53-.9.9-3.48 4.33-7.71 8.49-9.8l.897 1.81-.026-.015c.203.414.685.346.9-.063l2.613-4.88c.212-.41-.028-.79-.48-.87L24.04 13.9c-.454-.07-.82.28-.613.69l.99 1.97c-3.68 1.857-6.826 5.113-8.583 8.405-2.165-4.06-6.44-8.07-11.238-9.45-.665-.19-1.357.19-1.548.855-.19.663.19 1.356.854 1.547 5.103 1.467 9.663 6.602 10.713 10.687.073.284.237.52.453.683z"/>
                  <path d="M13.37 28.064c-2.25.286-3.828.952-3.828 1.727 0 1.04 2.813 1.88 6.286 1.88 3.47 0 6.29-.84 6.29-1.87 0-.76-1.55-1.43-3.76-1.72-.13.34-.22.61-.27.8-.04.19-.11.32-.15.39-.024.08-.07.17-.124.26-.152.25-.34.45-.554.62l-.12.09-.03.02c-.115.08-.263.15-.425.21l-.06.04-.212.06c-.112.03-.24.054-.37.064l-.03.006h-.276l-.035-.01c-.14-.01-.28-.03-.413-.065l-.19-.044-.067-.04c-.156-.06-.29-.13-.42-.205l-.048-.02-.125-.094c-.21-.16-.395-.366-.547-.61l-.06-.1-.078-.18c-.03-.05-.1-.186-.15-.373-.06-.22-.13-.496-.218-.803l-.02-.03z"/>
                </g>
        break

      case 'car':
        title = 'Car'
        path =  <g>
                  <path d="M28.5 12h-1.9l-1.643-5.475C24.39 5.39 23.953 5 22.64 5H9.36c-1.313 0-1.75.39-2.317 1.525L5.4 12H3.5c-.276 0-.5.224-.5.5v1c0 .276.224.5.5.5h.917L4 15v11.5c0 .275.225.5.5.5h2c.275 0 .5-.225.5-.5V25h18v1.5c0 .275.225.5.5.5h2c.275 0 .5-.225.5-.5V15l-.417-1h.917c.276 0 .5-.224.5-.5v-1c0-.276-.224-.5-.5-.5zM8.627 7.404c.125-.22.295-.404.607-.404h13.532c.312 0 .482.185.607.404.17.368 1.188 4.596 1.188 4.596H7.44s1.018-4.228 1.187-4.596zM10 19H7l-1-1v-2.1l4 1.1v2zm10 4h-8v-2h8v2zm6-5l-1 1h-3v-2l4-1.1V18z"/>
                  <path fill="#FFF" d="M8.627 7.404c.125-.22.295-.404.607-.404h13.532c.312 0 .482.184.607.404.17.368 1.188 4.596 1.188 4.596H7.44s1.02-4.228 1.187-4.596" opacity=".3"/>
                </g>
        break

      case 'car_hotel':
        title = 'Car & Hotel'
        path =  <g>
                  <path d="M17.34 17.927h.632c.116 0 .21-.094.21-.21v-1.263c0-.116-.094-.21-.21-.21h-1.157c-.335-.66-.764-1.098-1.742-1.098h-.26V7.4c0-.23.19-.42.422-.42H24.5c.23 0 .42.19.42.42v18.107h-2.527V23.19c0-.114-.094-.21-.21-.21h-3.95v-2.46c.264-.195.434-.505.434-.855v-.432c0-.584-.475-1.06-1.058-1.06h-.2l-.08-.246h.01zm.843-2.737v-1.263c0-.115-.095-.21-.21-.21H16.71c-.118 0-.213.095-.213.21v1.263c0 .117.095.21.21.21h1.264c.12 0 .21-.093.21-.21h.008zm0-2.526V11.4c0-.115-.095-.21-.21-.21H16.71c-.118 0-.213.095-.213.21v1.264c0 .116.095.21.21.21h1.264c.12 0 .21-.094.21-.21h.008zm0-2.526V8.874c0-.115-.095-.21-.21-.21H16.71c-.118 0-.213.095-.213.21v1.264c0 .116.095.21.21.21h1.264c.12 0 .21-.094.21-.21h.008zm2.526 10.105V18.98c0-.116-.1-.21-.22-.21h-1.26c-.12 0-.21.094-.21.21v1.263c0 .116.09.21.21.21h1.26c.112 0 .21-.094.21-.21h.01zm0-2.526v-1.263c0-.116-.1-.21-.22-.21h-1.26c-.12 0-.21.094-.21.21v1.263c0 .116.09.21.21.21h1.26c.112 0 .21-.094.21-.21h.01zm0-2.527v-1.263c0-.115-.1-.21-.22-.21h-1.26c-.12 0-.21.095-.21.21v1.263c0 .117.09.21.21.21h1.26c.112 0 .21-.093.21-.21h.01zm0-2.526V11.4c0-.115-.1-.21-.22-.21h-1.26c-.12 0-.21.095-.21.21v1.264c0 .116.09.21.21.21h1.26c.112 0 .21-.094.21-.21h.01zm0-2.526V8.874c0-.115-.1-.21-.22-.21h-1.26c-.12 0-.21.095-.21.21v1.264c0 .116.09.21.21.21h1.26c.112 0 .21-.094.21-.21h.01zm2.52 10.105V18.98c0-.116-.1-.21-.21-.21h-1.26c-.12 0-.21.094-.21.21v1.263c0 .116.09.21.21.21h1.26c.11 0 .21-.094.21-.21zm0-2.526v-1.263c0-.116-.1-.21-.21-.21h-1.26c-.12 0-.21.094-.21.21v1.263c0 .116.09.21.21.21h1.26c.11 0 .21-.094.21-.21zm0-2.527v-1.263c0-.115-.1-.21-.21-.21h-1.26c-.12 0-.21.095-.21.21v1.263c0 .117.09.21.21.21h1.26c.11 0 .21-.093.21-.21zm0-2.526V11.4c0-.115-.1-.21-.21-.21h-1.26c-.12 0-.21.095-.21.21v1.264c0 .116.09.21.21.21h1.26c.11 0 .21-.094.21-.21zm0-2.526V8.874c0-.115-.1-.21-.21-.21h-1.26c-.12 0-.21.095-.21.21v1.264c0 .116.09.21.21.21h1.26c.11 0 .21-.094.21-.21z"/>
                  <path d="M17.61 19.016h-.824l-.71-2.368c-.246-.49-.434-.66-1.003-.66H9.327c-.568 0-.757.17-1.002.66l-.71 2.368h-.823c-.12 0-.216.097-.216.216v.434c0 .12.096.216.216.216h.397l-.19.433v4.975c0 .12.09.217.21.217h.864c.12 0 .215-.097.215-.217v-.65h7.79v.65c0 .12.1.217.216.217h.866c.12 0 .215-.097.215-.217v-4.975l-.18-.433h.396c.12 0 .214-.097.214-.216v-.434c0-.12-.096-.216-.216-.216h.016zm-8.6-1.988c.055-.095.128-.175.263-.175h5.854c.136 0 .21.08.263.175.073.16.514 1.988.514 1.988H8.496s.44-1.83.514-1.988zm.594 5.017H8.306l-.432-.432v-.91l1.73.477v.865zm4.327 1.73h-3.46v-.865h3.46v.866zm2.6-2.162l-.43.432h-1.3v-.865l1.73-.476v.91z"/>
                  <path fill="#FFF" d="M9.01 17.028c.054-.095.128-.175.263-.175h5.854c.136 0 .21.08.263.175.073.16.515 1.988.515 1.988h-7.41s.442-1.83.515-1.988" opacity=".3"/>
                  <path d="M6.166 20.962v1.64l-2.342 1.04c-.023.95-.8 1.712-1.754 1.712-.97 0-1.755-.784-1.755-1.754s.785-1.754 1.755-1.754c.437 0 .838.16 1.145.425l2.95-1.3v-.003zm19.596-7.055v-1.64l2.52-1.12c.023-.95.8-1.712 1.756-1.712.967 0 1.754.785 1.754 1.754 0 .97-.787 1.75-1.754 1.75-.44 0-.84-.16-1.147-.43l-3.12 1.39-.003.002z"/>
                </g>
        break

      // case 'city':
      //   title = 'City'
      //   path = <path d="M5 27h1v1H5v-1zm2 0h1.002v1h-1v-1zm-2-2h1v1H5v-1zm2 0h1.002v1h-1v-1zm-2-2h1v1H5v-1zm2 0h1.002v1h-1v-1zm-2-2h1v1H5v-1zm2 0h1.002v1h-1v-1zm-2-2h1v1H5v-1zm2 0h1.002v1h-1v-1zm-2-2h1v1H5v-1zm2 0h1.002v1h-1v-1zm-2-2h1v1H5v-1zm2 0h1.002v1h-1v-1zm-2-2h1v1H5v-1zm2 0h1.002v1h-1v-1zm-2-2h1v1H5v-1zm2 0h1.002v1h-1v-1zM5 6v2H4v22h5V8H8V6H5zm12 21h1v1h-1v-1zm2 0h1v1h-1v-1zm-2-2h1v1h-1v-1zm2 0h1v1h-1v-1zm-2-2h1v1h-1v-1zm2 0h1v1h-1v-1zm-2-2h1v1h-1v-1zm2 0h1v1h-1v-1zm-2-2h1v1h-1v-1zm2 0h1v1h-1v-1zm-2-2h1v1h-1v-1zm2 0h1v1h-1v-1zm-2-2h1v1h-1v-1zm2 0h1v1h-1v-1zm-2-2h1v1h-1v-1zm2 0h1v1h-1v-1zm-2-2h1v1h-1v-1zm2 0h1v1h-1v-1zm-2-2h1v1h-1V9zm2 0h1v1h-1V9zm-2-2h1v1h-1V7zm2 0h1v1h-1V7zm2-4l-5 3v24h5V3zM11 26h1v1h-1v-1zm2 0h1v1h-1v-1zm-2-2h1v1h-1v-1zm2 0h1v1h-1v-1zm-2-2h1v1h-1v-1zm2 0h1v1h-1v-1zm-2-2h1v1h-1v-1zm2 0h1v1h-1v-1zm-2-2h1v1h-1v-1zm2 0h1v1h-1v-1zm-2-2h1v1h-1v-1zm2 0h1v1h-1v-1zm-2-2h1v1h-1v-1zm2 0h1v1h-1v-1zm-2-2h1v1h-1v-1zm2 0h1v1h-1v-1zm-3 18h5V11h-5v19zm13-4h1v1h-1v-1zm2 0h1.002v1h-1v-1zm-2-2h1v1h-1v-1zm2 0h1.002v1h-1v-1zm-2-2h1v1h-1v-1zm2 0h1.002v1h-1v-1zm-2-2h1v1h-1v-1zm2 0h1.002v1h-1v-1zm-2-2h1v1h-1v-1zm2 0h1.002v1h-1v-1zm-2-2h1v1h-1v-1zm2 0h1.002v1h-1v-1zm-2-2h1v1h-1v-1zm2 0h1.002v1h-1v-1zm0-2v1h-1v-1h-1v1h-1v17h5V13h-1v-1h-1z"/>
      //   break

      case 'multicity':
        title = 'Multi-City'
        path = <path d="M20.935 16.91c.677.07 1.34.16 1.983.272l-.734-1.482h.005c-.305-.523-.48-1.13-.48-1.778 0-1.963 1.59-3.555 3.555-3.555 1.964 0 3.556 1.592 3.556 3.555 0 .65-.176 1.255-.48 1.778h.005l-1.267 2.56c1.592.58 2.94 1.306 3.94 2.153.42.357.473.988.116 1.41-.356.42-.987.474-1.41.117-.86-.73-2.074-1.366-3.54-1.877l-.92 1.86-1.224-2.475c-1.187-.276-2.477-.48-3.83-.6l-2.81 5.67-2.806-5.67c-1.355.12-2.645.323-3.832.6L9.536 21.92l-.92-1.86c-1.438.5-2.635 1.124-3.494 1.836-.425.352-1.056.293-1.408-.132-.353-.425-.294-1.056.132-1.408.994-.824 2.318-1.533 3.877-2.1L6.456 15.7h.005c-.302-.524-.48-1.13-.48-1.778 0-1.963 1.592-3.555 3.556-3.555 1.965 0 3.556 1.592 3.556 3.555 0 .65-.175 1.254-.48 1.778h.005l-.733 1.48c.643-.11 1.306-.2 1.983-.272-.015-.128-.022-.258-.022-.39 0-1.964 1.592-3.556 3.556-3.556 1.965 0 3.556 1.592 3.556 3.556 0 .132-.007.262-.02.39zm-3.533 1.385c.98 0 1.778-.796 1.778-1.777 0-.982-.797-1.778-1.778-1.778-.982 0-1.778.796-1.778 1.778 0 .98.796 1.777 1.778 1.777zM9.538 15.7c.98 0 1.777-.796 1.777-1.778 0-.98-.796-1.778-1.777-1.778-.983 0-1.778.797-1.778 1.778 0 .982.795 1.778 1.778 1.778zm13.948-1.778c0 .98.797 1.778 1.778 1.778.982 0 1.778-.797 1.778-1.778 0-.982-.796-1.778-1.778-1.778-.98 0-1.778.796-1.778 1.778z"/>
        break

      case 'bubble':
        title = 'Bubble'
        path = <path d="M25 5H7C5.35 5 4 6.35 4 8v11c0 1.65 1.35 3 3 3h2v6l6-6h10c1.65 0 3-1.35 3-3V8c0-1.65-1.35-3-3-3zm-15 7.45C9 12.826 8.68 14 8.68 15H10v3H7v-3.305c0-1.957 1-3.453 3-3.695v1.45zm4 0c-1 .376-1.326 1.55-1.326 2.55H14v3h-3v-3.305c0-1.957 1-3.453 3-3.695v1.45zm7-1.085c0 1.958-1 3.45-3 3.692v-1.45C19 13.234 19.452 12 19.452 11H18V8h3v3.365zm4 0c0 1.958-1 3.45-3 3.692v-1.45C23 13.234 23.327 12 23.327 11H22V8h3v3.365z"/>
        break

      case 'spinner':
        title = 'Loading...'
        viewbox = '0 0 80 80'
        path =  <g>
                  <path className="fans" d="M31.2 31.2L17 17c2.4-2.4 5.1-4.4 8.2-5.9C30 15.9 33.7 21.7 36 28.2c-1.8.6-3.5 1.6-4.8 3zm17.6 17.6L63 63c-2.4 2.4-5.1 4.4-8.2 5.9C50 64.1 46.3 58.3 44 51.8c1.8-.6 3.5-1.6 4.8-3zm-20.9-12L8.6 31.6c.9-3.3 2.3-6.4 4.1-9.2 6.6 1.8 12.7 5 17.9 9.4-1.2 1.4-2.2 3.1-2.7 5zm24.2 6.4l19.3 5.2c-.9 3.3-2.3 6.4-4.1 9.2-6.6-1.8-12.7-5-17.9-9.4 1.2-1.4 2.2-3.1 2.7-5zm-20.9 5.6L17 63c-2.4-2.4-4.4-5.1-5.9-8.2C15.9 50 21.7 46.3 28.2 44c.6 1.8 1.6 3.5 3 4.8zm17.6-17.6L63 17c2.4 2.4 4.4 5.1 5.9 8.2C64.1 30 58.3 33.7 51.8 36c-.6-1.8-1.6-3.5-3-4.8zm-12 20.9l-5.2 19.3c-3.3-.9-6.4-2.3-9.2-4.1 1.8-6.6 5-12.7 9.4-17.9 1.4 1.2 3.1 2.2 5 2.7zm6.4-24.2l5.2-19.3c3.3.9 6.4 2.3 9.2 4.1-1.8 6.6-5 12.7-9.4 17.9-1.4-1.2-3.1-2.2-5-2.7zm0 24.2l5.2 19.3c-3.3.9-6.7 1.2-10.1 1-1.8-6.6-2-13.5-.8-20.2 1.9.4 3.8.4 5.7-.1zm-6.4-24.2L31.6 8.6c3.3-.9 6.7-1.2 10.1-1 1.8 6.6 2 13.5.8 20.2-1.9-.4-3.8-.4-5.7.1zm-8.9 15.3L8.6 48.4c-.9-3.3-1.2-6.7-1-10.1 6.6-1.8 13.5-2 20.2-.8-.4 1.9-.4 3.8.1 5.7zm24.2-6.4l19.3-5.2c.9 3.3 1.2 6.7 1 10.1-6.6 1.8-13.5 2-20.2.8.4-1.9.4-3.8-.1-5.7z"/>
                  <path d="M40 0C17.8667 0 0 17.8667 0 40s17.8667 40 40 40 40-17.8667 40-40S62.1333 0 40 0zm0 73.1707C21.6898 73.1707 6.8293 58.3102 6.8293 40 6.8293 21.6898 21.6898 6.8293 40 6.8293c18.3102 0 33.1707 14.8605 33.1707 33.1707 0 18.3102-14.8605 33.1707-33.1707 33.1707z"/>
                  <path fillRule="evenodd" d="M40 51c6.075 0 11-4.925 11-11s-4.925-11-11-11-11 4.925-11 11 4.925 11 11 11zm0-10c.5523 0 1-.4477 1-1s-.4477-1-1-1-1 .4477-1 1 .4477 1 1 1z"/>
                </g>
        break

      default:

    }
    this.type = type
    this.title = title
    this.viewbox = viewbox
    this.path = path
  }

  render() {
    const {type, title, viewbox, path} = this

    if (!type)
      return null

    return (
      <svg className={css.icon + ' -' + type} xmlns="http://www.w3.org/2000/svg" aria-labelledby="title" viewBox={viewbox} fill="currentColor">
        <title>{title}</title>
        {path}
      </svg>
    )
  }
}

export default SVG
