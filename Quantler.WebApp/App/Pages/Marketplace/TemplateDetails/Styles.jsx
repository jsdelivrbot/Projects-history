let details = {
  borderBottom: '1px solid rgba(0, 0, 0, 0.05)',
  height: 41,
  width: '100%',
}

export let Styles = () => ({
  base: {
    padding: 20
  },
  backButton: {
    background: '#3e3f4b',
    color: '#fff',
    border: 'none',
    borderRadius: 4,
    padding: '14px 28px',
    fontWeight: 'bold',
    ':hover': {
      opacity: '0.95'
    }
  },
  details: {
    base: {
      marginTop: 20,
      minWidth: 500,
      background: '#fff',
      borderTop: '3px solid #ffcf54'
    },
    header: {
      base: {
        height: details.height,
        width: details.width,
        borderBottom: details.borderBottom,
        overflow: 'hidden'
      },
      title: {
        float: 'left',
        paddingLeft: 10
      },
      buttons: {
        float: 'right'
      }
    },
    tabs: {
      base: {
        width: details.width,
        height: details.height,
        overflow: 'hidden'
      },
      tab: {
        height: details.height,
        paddingTop: 11,
        width: 124,
        float: 'left',
        textAlign: 'center',
        cursor: 'pointer'
      },
      active: {
        background: '#f5f7fa',
        color: '#ee4415'
      }
    },
    content: {
      base: {
        width: details.width
      },
      note: {
        background: "#F5F7FA",
        padding: 15
      },
      code: {
        base: {},
        filePanel: {
          base: {
            paddingTop: 10,
            borderTop: "1px solid #F5F7FA"
          },
          list: {
            listStyleType: 'none',
            padding: 0,
            marginTop: 10
          },
          listItem: active => ({
            color: (active ? "#e84e1b" : "inherit"),
            cursor: "pointer",
            opacity: "0.8",
            ":hover": {
              opacity: "1"
            }
          })
        },
        editor: (height) => ({
          background: '#3e3f4b',
          padding: 0,
          height
        })
      }
    }
  },
  comments: {
    base: {
      marginTop: 20
    },
    posts: {
      base: {},
      post: {
        base: {
          width: '100%',
          background: "#fff",
          marginTop: 20
        },
        header: {
          width: '100%',
          borderBottom: '1px solid #eee',
          padding: 20
        },
        profileImage: imageUrl => ({
          width: 50,
          height: 50,
          borderRadius: 50,
          backgroundColor: "#eee",
          backgroundImage: `url(${ imageUrl })`,
          backgroundPosition: "center",
          backgroundSize: "contain",
          display: "inline-block",
          verticalAlign: "middle",
          float: "none"
        }),
        name: {
          display: "inline-block",
          verticalAlign: "middle",
          float: "none"
        },
        date: {},
        content: {
          padding: 20
        }
      }
    },
    reply: {
      base: {
        marginTop: 20
      },
    }
  }
})
