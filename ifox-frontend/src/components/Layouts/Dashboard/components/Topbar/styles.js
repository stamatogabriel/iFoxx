export default theme => ({
    root: {
      borderBottom: `1px solid ${theme.palette.border}`,
      backgroundColor: "#fff",
      color: '#333',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      height: '80px',
      boxShadow: '2px 2px 3px 1px #999',
      zIndex: theme.zIndex.appBar,
      width: '100%',
    },
    toolbar: {
      minHeight: 'auto',
      width: '100%',
      top: 0,
    },
    menuButton: {
      marginLeft: '-4px',
      color: '#222',
    },
    info: {
      margin: '5px 30px 5px 30px',
      textAlign: 'center',
      padding: 0
    },
    avatar: {
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      margin: '5px 10px 5px auto',
      textDecoration: 'none',
      color: '#333'
    },
    user: {
      margin: '15px'
    },
  });
  