const cardStyle = {
    card: {
        // overflowX: 'auto',
        // overflowY: 'auto',
        display: "inline-block",
        position: "relative",
        display: 'flex',
        flex: 'auto',
        flexDirection: 'column',
        width: "auto",
        minWidth: '0',
        fontSize: '.875rem',
        boxShadow: "0 1px 4px 0 rgba(0, 0, 0, 0.14)",
        borderRadius: "6px",
        color: "rgba(0, 0, 0, 0.87)",
        background: "#fff",
        wordWrap: 'break-word',
    },

    cardBody: {
        // overflowX: 'auto',
        // overflowY: 'auto',
        width: 'auto',
        padding: "0.9375rem 1.875rem",
        flex: "1 1 auto"
    },

    cardFooter: {
        display: "flex",
        // backgroundColor: "transparent",
        padding: "0.9375rem 1.875rem",
        textAlign: "center",
    },

    cardHeader: {
        // overflowX: 'visible',
        // overflowY: 'visible',
        borderRadius: '3px',
        padding: '1rem 15px',
        marginLeft: '15px',
        marginRight: '15px',
        marginTop: '15px',
        border: '5px',
        marginBottom: '0',
        backgroundColor: '#aa514c',
        color: '#fff',
        textAlign: 'center',
    },
};

export default cardStyle;