const base="http://localhost:8000"
const link={
    login:`${base}/api/auth/login`,
    sign:`${base}/api/auth/sign`,
    images:`${base}/api/auth/images`,
    githubLogin:`${base}/api/auth/github`,
    getData:`${base}/api/auth/oauth`


}

export {base,link}