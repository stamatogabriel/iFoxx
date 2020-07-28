export default theme => ({
    root: {
      backgroundColor: '#D44D0B',
      display: 'flex',
      flexDirection: 'column',
      height: '100vh',
      overflow: 'auto',
      padding: '0 10px'
    },
    button: {
      margin: 'auto',
      background: 'transparent',
      marginTop: '60px',
      width: '50%',
      color:'#FFA459',
      border: 'none !important',
      boxShadow: 'none !important',
      '&:hover': {
        background: 'transparent',
      }
    },
    nested: {
      paddingLeft: theme.spacing(4),
      cursor: 'pointer',
      height: '35px',
      '&:hover': {
        backgroundColor: '#FFA459',
        borderLeft: '4px solid #EB2D00',
        borderRadius: '4px',
        '& $listItemIcon': {
          color: '#EB2D00',
          marginLeft: '-4px'
        },
        '& $listItemText': {
          color: '#EB2D00',
        }
      },
      '& + &': {
        marginTop: theme.spacing.unit
      }
    },
    logoWrapper: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      height: '80px',
      width: '100%',
      margin: '0',
      flexShrink: 0,
      background: '#fff',
    },
    logoImage: {
      cursor: 'pointer'
    },
    logoDivider: {
      marginBottom: theme.spacing.unit * 2
    },
    rightIcon: {
      marginLeft: theme.spacing(1),
    },
    listItem: {
      cursor: 'pointer',
      height: '35px',
      '&:hover': {
        backgroundColor: '#FFA459',
        borderLeft: '4px solid #EB2D00',
        borderRadius: '4px',
        '& $listItemIcon': {
          color: '#EB2D00',
          marginLeft: '-4px'
        },
        '& $listItemText': {
          color: '#EB2D00',
        }
      },
      '& + &': {
        marginTop: theme.spacing.unit
      }
    },
    activeListItem: {
      borderLeft: `4px solid #EB2D00`,
      borderRadius: '4px',
      backgroundColor: '#FFA459',
      '& $listItemText': {
        color: '#EB2D00'
      },
      '& $listItemIcon': {
        color: '#EB2D00',
        marginLeft: '-4px'
      }
    },
    listItemIcon: {
      marginRight: 0,
      color: '#DBB99C'
    },
    listItemText: {
      fontWeight: 500,
      color: '#DBB99C'
    },
    listDivider: {
      marginBottom: theme.spacing.unit * 2,
      marginTop: theme.spacing.unit * 2
    }
  });