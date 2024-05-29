import { PowerBIEmbed } from 'powerbi-client-react'
import { models } from 'powerbi-client'
function PowerBi() {
  return (
    <PowerBIEmbed
      embedConfig={{
        type: 'report', // Supported types: report, dashboard, tile, visual, qna, paginated report and create
        id: '7b8f37fc-9f5d-4304-b726-65b0e3166cf2',
        embedUrl:
          'https://app.powerbi.com/reportEmbed?reportId=7b8f37fc-9f5d-4304-b726-65b0e3166cf2&groupId=344a2f3d-61b2-40ef-be97-520a23c40f2d&w=2&config=eyJjbHVzdGVyVXJsIjoiaHR0cHM6Ly9XQUJJLVNPVVRILUVBU1QtQVNJQS1yZWRpcmVjdC5hbmFseXNpcy53aW5kb3dzLm5ldCIsImVtYmVkRmVhdHVyZXMiOnsidXNhZ2VNZXRyaWNzVk5leHQiOnRydWV9fQ%3d%3d',
        accessToken:
          'eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsIng1dCI6IkwxS2ZLRklfam5YYndXYzIyeFp4dzFzVUhIMCIsImtpZCI6IkwxS2ZLRklfam5YYndXYzIyeFp4dzFzVUhIMCJ9.eyJhdWQiOiJodHRwczovL2FuYWx5c2lzLndpbmRvd3MubmV0L3Bvd2VyYmkvYXBpIiwiaXNzIjoiaHR0cHM6Ly9zdHMud2luZG93cy5uZXQvZTc1NzJlOTItN2FlZS00NzEzLWEzYzQtYmE2NDg4OGFkNDVmLyIsImlhdCI6MTcxNjQyMjAwMiwibmJmIjoxNzE2NDIyMDAyLCJleHAiOjE3MTY0MjYzMjgsImFjY3QiOjAsImFjciI6IjEiLCJhaW8iOiJBVFFBeS84V0FBQUFTMVJJVG5MQTBjVnAwT0lvNERhdjBMS2pna0xDOVNCakp1VzMxekNyOHhUNDFYTm9VTTR0T0gvZDR5aTUrV1hEIiwiYW1yIjpbInB3ZCJdLCJhcHBpZCI6Ijg3MWMwMTBmLTVlNjEtNGZiMS04M2FjLTk4NjEwYTdlOTExMCIsImFwcGlkYWNyIjoiMCIsImlwYWRkciI6IjEwMy4yMzguNjguODIiLCJuYW1lIjoiQlVJIEFOSCBETyBEMjBDTjExIiwib2lkIjoiODU3N2RmNWEtYWZlZi00YWVlLWE0MzItMGM5ZGZmNzQ5Y2M3Iiwib25wcmVtX3NpZCI6IlMtMS01LTIxLTMzMjY4MjA0ODYtMzAyMDA5NzM4OC0xOTg3NzMwODQ0LTIwNDYyIiwicHVpZCI6IjEwMDMyMDAwRUU4RUUxNzYiLCJyaCI6IjAuQVhJQWtpNVg1LTU2RTBlanhMcGtpSXJVWHdrQUFBQUFBQUFBd0FBQUFBQUFBQUREQUJRLiIsInNjcCI6InVzZXJfaW1wZXJzb25hdGlvbiIsInNpZ25pbl9zdGF0ZSI6WyJrbXNpIl0sInN1YiI6IllzMlJqcTNqU3NsSF9pSHUzUlVUT1ZrdE90Sjk4OG5XTW5Kajgwbm9XWXMiLCJ0aWQiOiJlNzU3MmU5Mi03YWVlLTQ3MTMtYTNjNC1iYTY0ODg4YWQ0NWYiLCJ1bmlxdWVfbmFtZSI6IkRvQkEuQjIwQ04xOTFAc3R1LnB0aXQuZWR1LnZuIiwidXBuIjoiRG9CQS5CMjBDTjE5MUBzdHUucHRpdC5lZHUudm4iLCJ1dGkiOiJ4cmY0ZkU2aTJrZW54aWtCcll6cUFBIiwidmVyIjoiMS4wIiwid2lkcyI6WyJiNzlmYmY0ZC0zZWY5LTQ2ODktODE0My03NmIxOTRlODU1MDkiXX0.DHqfUZEtiWlYbDkUai8USNt9PyGpBnxbKr38PgjDcHbhDGgoFynvbyGHbNAVkoPRvtcAHB16G8ZOR_A72AeLIw_u-e_IBk3v5gXK61unL9b0OorbQKP0VwHh8VDPLGVrtJZm1BL9qj0LKsDTqx36bJKLCHSSr-0iYKZdLDfKfmtHPuNl9yNqhVnOGG__a2E9AdQmubtBRaZWxdrCcm3n18X1fdiepaQ7Z1g8qv_4XDkR56iQrAQAYvHtGMvdV5BR2enhpnO2MfrT6SSdOPrEyf3kuG2THtPuk4BgbV9YYFj9TS_Qfdx8oLgKNsry9KoGEAGQYOXH5Fdw4yHyD1m7Zg',
        tokenType: models.TokenType.Aad, // Use models.TokenType.Aad for SaaS embed
        settings: {
          panes: {
            filters: {
              expanded: false,
              visible: false
            }
          },
          background: models.BackgroundType.Transparent
        }
      }}
      eventHandlers={
        new Map([
          [
            'loaded',
            function () {
              console.log('Report loaded')
            }
          ],
          [
            'rendered',
            function () {
              console.log('Report rendered')
            }
          ],
          [
            'error',
            function (event: any) {
              console.log(event.detail)
            }
          ],
          ['visualClicked', () => console.log('visual clicked')],
          ['pageChanged', (event) => console.log(event)]
        ])
      }
      cssClassName={' h-screen w-full'}
      getEmbeddedComponent={(embeddedReport: any) => {
        window.Report = embeddedReport
      }}
    />
  )
}

export default PowerBi
