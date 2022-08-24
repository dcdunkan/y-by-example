/** @jsx h */
import { h } from "preact";

export function CircleArrow(props: { right?: boolean }) {
  return (
    <svg
      width="1em"
      height="1em"
      viewBox="0 0 45.035156 44.982422"
      style={{
        flexShrink: 0,
        transform: props.right ? "rotate(180deg)" : undefined,
      }}
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M22.517578 44.982422 C19.423813 44.982422 16.505873 44.384772 13.763672 43.189453 C11.021471 42.029291 8.630870 40.429698 6.591797 38.390625 C4.552724 36.351552 2.953131 33.960951 1.792969 31.218750 C0.597650 28.511705 0.000000 25.593766 0.000000 22.464844 C0.000000 19.371078 0.597650 16.453139 1.792969 13.710938 C2.953131 11.003893 4.552724 8.630870 6.591797 6.591797 C8.630870 4.552724 11.021471 2.935553 13.763672 1.740234 C16.505873 0.580072 19.423813 -0.000000 22.517578 -0.000000 C25.611344 -0.000000 28.529283 0.580072 31.271484 1.740234 C34.013686 2.935553 36.404287 4.552724 38.443359 6.591797 C40.482432 8.630870 42.082025 11.003893 43.242188 13.710938 C44.437506 16.453139 45.035156 19.371078 45.035156 22.464844 C45.035156 25.593766 44.437506 28.511705 43.242188 31.218750 C42.082025 33.960951 40.482432 36.351552 38.443359 38.390625 C36.404287 40.429698 34.013686 42.029291 31.271484 43.189453 C28.529283 44.384772 25.611344 44.982422 22.517578 44.982422 Z M22.517578 40.500000 C25.013684 40.500000 27.351552 40.025395 29.531250 39.076172 C31.710948 38.126948 33.618156 36.834969 35.252930 35.200195 C36.887703 33.565422 38.179683 31.658214 39.128906 29.478516 C40.042973 27.298817 40.500000 24.960950 40.500000 22.464844 C40.500000 20.003894 40.042973 17.666027 39.128906 15.451172 C38.179683 13.271473 36.887703 11.373055 35.252930 9.755859 C33.618156 8.138664 31.710948 6.855473 29.531250 5.906250 C27.351552 4.957027 25.013684 4.482422 22.517578 4.482422 C20.021472 4.482422 17.683605 4.957027 15.503906 5.906250 C13.324208 6.855473 11.417000 8.138664 9.782227 9.755859 C8.147453 11.373055 6.855473 13.271473 5.906250 15.451172 C4.992183 17.666027 4.535156 20.003894 4.535156 22.464844 C4.535156 24.960950 4.992183 27.298817 5.906250 29.478516 C6.855473 31.658214 8.147453 33.565422 9.782227 35.200195 C11.417000 36.834969 13.324208 38.126948 15.503906 39.076172 C17.683605 40.025395 20.021472 40.500000 22.517578 40.500000 Z M18.931641 20.250000 L31.535156 20.250000 C32.132815 20.250000 32.651365 20.469724 33.090820 20.909180 C33.530276 21.348635 33.750000 21.867185 33.750000 22.464844 C33.750000 23.097659 33.530276 23.633787 33.090820 24.073242 C32.651365 24.512698 32.132815 24.732422 31.535156 24.732422 L18.931641 24.732422 L24.679688 30.427734 C24.855470 30.638673 25.004882 30.875975 25.127930 31.139648 C25.250977 31.403322 25.312500 31.693358 25.312500 32.009766 C25.312500 32.642581 25.092776 33.178709 24.653320 33.618164 C24.213865 34.057619 23.677738 34.277344 23.044922 34.277344 C22.728514 34.277344 22.438478 34.215821 22.174805 34.092773 C21.911131 33.969726 21.673829 33.820313 21.462891 33.644531 L11.917969 24.046875 C11.707030 23.871093 11.548829 23.642580 11.443359 23.361328 C11.337890 23.080077 11.285156 22.781252 11.285156 22.464844 C11.285156 22.148436 11.337890 21.858400 11.443359 21.594727 C11.548829 21.331053 11.707030 21.093751 11.917969 20.882812 L21.462891 11.337891 C21.673829 11.162108 21.911131 11.012696 22.174805 10.889648 C22.438478 10.766601 22.728514 10.705078 23.044922 10.705078 C23.677738 10.705078 24.213865 10.924802 24.653320 11.364258 C25.092776 11.803713 25.312500 12.339841 25.312500 12.972656 C25.312500 13.253908 25.250977 13.535155 25.127930 13.816406 C25.004882 14.097658 24.855470 14.326171 24.679688 14.501953 Z M49.517578 44.982422"
        fill="currentColor"
      >
      </path>
    </svg>
  );
}

export function Stop() {
  return (
    <svg
      width="1rem"
      fill="none"
      viewBox="0 0 65 65"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M0 20C0 8.954 8.954 0 20 0h25c11.046 0 20 8.954 20 20v25c0 11.046-8.954 20-20 20H20C8.954 65 0 56.046 0 45V20Z"
        fill="#000"
      />
    </svg>
  );
}

export function Start() {
  return (
    <svg
      width="1rem"
      fill="none"
      viewBox="0 0 65 72"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M60 27.335c6.667 3.85 6.667 13.472 0 17.32L15 70.638c-6.667 3.849-15-.963-15-8.66V10.014c0-7.698 8.333-12.51 15-8.66l45 25.98Z"
        fill="#000"
      />
    </svg>
  );
}

export function Loading() {
  return (
    <svg
      width="1rem"
      viewBox="0 0 100 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M100 50C100 22.3913 77.6087 0 50 0C22.3913 0 0 22.3913 0 50M8.47826 50C8.47826 27.1739 26.9565 8.47826 50 8.47826C73.0435 8.47826 91.5217 27.1739 91.5217 50"
        fill="black"
      >
        <animateTransform
          attributeName="transform"
          attributeType="XML"
          type="rotate"
          dur="1s"
          from="0 50 50"
          to="360 50 50"
          repeatCount="indefinite"
        />
      </path>
    </svg>
  );
}
