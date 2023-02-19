import fs from 'fs'
import * as dotenv from 'dotenv';

const privateKey = fs.readFileSync('src/config/cert/certificate.key');
const publicKey = fs.readFileSync('src/config/cert/certificate.crt');
dotenv.config();

export default {
    
    port: +(process.env.PORT || 5000),
    // base url is always without a trailing slash "/"
    baseUrl: process.env.BASE_URL || 'http://localhost:5000',
    mongoUrl: process.env.MONGODB_URI || 'mongodb://localhost:27017/techsupport',
    
    jwt: {
        publicKey: ('-----BEGIN CERTIFICATE-----\nMIIFXzCCA0egAwIBAgIUBuxMYr1PODpPLw/0kpc3U0Duw9AwDQYJKoZIhvcNAQEL\nBQAwPzELMAkGA1UEBhMCRUcxEzARBgNVBAgMClNvbWUtU3RhdGUxGzAZBgNVBAoM\nEklkZW50aXR5IFNvbHV0aW9uczAeFw0yMTA4MjkxNDM3MTBaFw0zMTA4MjcxNDM3\nMTBaMD8xCzAJBgNVBAYTAkVHMRMwEQYDVQQIDApTb21lLVN0YXRlMRswGQYDVQQK\nDBJJZGVudGl0eSBTb2x1dGlvbnMwggIiMA0GCSqGSIb3DQEBAQUAA4ICDwAwggIK\nAoICAQCfrj35D0F/ZB2SkiXeVlvhTrKj8kX5TUGgngZYZlX9sm7ZPiN2XMNZ37s6\nKlenc9IgV8SgQDct4N1YUFRnLi6cxxj90H0lmxhUaQOAX8OwbGNmnJ4lD/WyORFv\nJd1XpQuqHLugh6UHS3B2Csr9Tfr3VWd0lzstKAYuAMsIwsAIsjlUt9ADPpUAhs+Z\nMw0NAEkBYm7UZ3gXKMO3fxfCCi4uBVt1/AKMRyzJiD8hqezMDUpOWI42iAQE65CI\n3ynupFLClPs0VUVT/vpnlkl5tms/WyrZknvPDF3CwjrAqN9NvS6zfKjAcx/zD8XU\n2lDZqv8iG0L5NFon0Nptj7LD9+zQMABsjUVZVRImhfMbS8m8gTI1a3DaYRLiOyug\nCzAtOWcG9oJFKKupamhY/mOdaorZdm47wqk7I44WytVFUS8nnCipDmCJaaxrxj2Y\nZq0l7GWnxWa5AE0lOT/a7tCY5TAM5JWGxJ5c5hxG2/wEMxi35017H8Slz8VksoSm\nhtOaTovVsMlEDq1DnlUt5Q0lvutUzVrsvcQrDcNmknLg3PhfoyudKQJx8OOz7Gmz\nFAzhZ2PgAQz/tP/k0lXHaroAF7OEWtpMvCcdTPNQvWGEMefn/5Zly0ooXxo4DEzO\ntoYzSMVR6pJiq1COWBpOEQHASRLci/mtEZvhh5OQq0qucrTIHQIDAQABo1MwUTAd\nBgNVHQ4EFgQUAOFfd2PmsSrLeYhmWtXbAeO/rjUwHwYDVR0jBBgwFoAUAOFfd2Pm\nsSrLeYhmWtXbAeO/rjUwDwYDVR0TAQH/BAUwAwEB/zANBgkqhkiG9w0BAQsFAAOC\nAgEAFSITpqj2fp+UBLgRaTWjrPUyl+rOAKVgiLbWhj0dHSDfQwWOx3ArGx7VL/tX\ns1GmA7M9WNDeSwL9T7Z6HnV/VD6g/D9t1xLZcjKYSl741ELMim4oT/cJuTYFyYs7\nlMW+15ngIZ99zuIRMV4LLW2YexLrSpexXFvEjZKWp4YuWpxACZbrIMyWB7zZ/akX\nXBcAadLvK30GAky9y6W1YsWZPEW56covYCx9pjJbc0qHfrMjeV4kWBYkqhi1YUe7\n/XDtAQYufFcxhmPcw6wZORlLE4wHUqduAOo+Ox6lJB6XWd3G0L3WmpEr+5vWZUkt\nl/wYjFXfa0ywKxTjGaKv1lPKNBQTHzstGFFu18Ka1qEl2b6zdkXjom6aykY9hvn7\nn+ZfjMu9uyr6IxFm1ITfrtxBWAWy7ub4SbMA/whmj+hLyO7Ns76JL1QBRJtKJqm2\nUa1WPvyWlg3265GWLZ6XIB78CQ+EVZxq23viPKjfMuDw128Z8s0DbsAFoycnC/n6\nZWZ+jVx1w2C0C3sgDzACGhI9Eo+01tBoJEm6nJEDDogT2OarLgqYxnfQxpdShXfg\nacHFoRyaRCubIb2Av6q5+7zbeJCPLeisrIOlsUimyR5tODJKF7nk+Q6q2SfBydfH\nrMJljsL0vhn6bg6WDRs5uBsvUVIdit50fxxGt8gxL5xWcIA=\n-----END CERTIFICATE-----\n' as string).replace(/\\n/g, '\n'),
        privateKey: ('-----BEGIN PRIVATE KEY-----\n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\nXbGvTif9IiM1yCNSOGywiujjbx8UYA==\n-----END PRIVATE KEY-----\n' as string).replace(/\\n/g, '\n'),
        accessTokenValidPeriod: 15 * 60,
        refreshTokenValidPeriod: 7 * 24 * 60 * 60,
        forgotPasswordTokenValidPeriod: 60 * 60
    },
    userAuth: {
        jwtKey: process.env.JWT_KEY,
        rounds: 12
    },
    superAdmin: {
        firstName: process.env.ADMIN_FIRST_NAME as string,
        lastName: process.env.ADMIN_LAST_NAME as string,
        email: process.env.ADMIN_EMAIL as string,
        password: process.env.ADMIN_PASSWORD as string,
        role: 'Super Admin',
    },
    weekIndex: ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday']
};