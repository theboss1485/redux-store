// The jumbotron is the success message that appears after a purchse is made.
function Jumbotron({ children }) {
    return (
        <div
            style={{ height: 560, clear: "both", paddingTop: 120, textAlign: "center" }}
        >
            {children}
        </div>
    );
}

export default Jumbotron;
