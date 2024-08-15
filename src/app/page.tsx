import { ClearDataButton } from "@/components/clear-data-button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import prisma from '@/lib/prisma'
import { RenderPassReport } from "@prisma/client"

export const revalidate = 60

export default async function Home() {
  const reports: RenderPassReport[] = await prisma.renderPassReport.findMany({
    orderBy: { createdAt: 'desc' },
    take: 10,
  })

  return (
    <main className="p-4 md:p-10 mx-auto max-w-7xl">
      <Card>
        <CardHeader>
          <CardTitle>Render Pass Tracker</CardTitle>

        </CardHeader>
        <CardContent className="space-y-4">
        <ClearDataButton  />
        <div className="max-h-[500px] overflow-auto scrollbar-hide">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Report ID</TableHead>
                  <TableHead>Flow Instance ID</TableHead>
                  <TableHead>Source Screen</TableHead>
                  <TableHead>Destination Screen</TableHead>
                  <TableHead>Flow Start Time</TableHead>
                  <TableHead>Touch Event Time (ms)</TableHead>
                  <TableHead>Boot Time (ms)</TableHead>
                  <TableHead>Render Pass Name</TableHead>
                  <TableHead>Render Time (ms)</TableHead>
                  <TableHead>Abort Time (ms)</TableHead>
                  <TableHead>Interactive</TableHead>
                  <TableHead>Resource Acquisition Time (ms)</TableHead>
                  <TableHead>Created At</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {reports.map((report) => {
                  const resourceAcquisitionStatus = report.resourceAcquisitionStatus
                    ? JSON.parse(report.resourceAcquisitionStatus)
                    : null;

                  return (
                    <TableRow key={report.reportId}>
                      <TableCell>{report.reportId}</TableCell>
                      <TableCell>{report.flowInstanceId}</TableCell>
                      <TableCell>{report.sourceScreen || 'N/A'}</TableCell>
                      <TableCell>{report.destinationScreen}</TableCell>
                      <TableCell>{new Date(report.flowStartTimeSinceEpochMillis).toLocaleString()}</TableCell>
                      <TableCell>{report.timeToConsumeTouchEventMillis?.toFixed(2) || 'N/A'}</TableCell>
                      <TableCell>{report.timeToBootJsMillis?.toFixed(2) || 'N/A'}</TableCell>
                      <TableCell>{report.renderPassName || 'N/A'}</TableCell>
                      <TableCell>{report.timeToRenderMillis?.toFixed(2) || 'N/A'}</TableCell>
                      <TableCell>{report.timeToAbortMillis?.toFixed(2) || 'N/A'}</TableCell>
                      <TableCell>{report.interactive ? 'Yes' : 'No'}</TableCell>
                      <TableCell>
                        {resourceAcquisitionStatus
                          ? resourceAcquisitionStatus.totalTimeMillis.toFixed(2)
                          : 'N/A'}
                      </TableCell>
                      <TableCell>{new Date(report.createdAt).toLocaleString()}</TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </main>
  )
}