import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function POST(request: Request) {
  try {
    const data = await request.json();
    const savedReport = await prisma.renderPassReport.create({
      data: {
        reportId: data.reportId,
        flowInstanceId: data.flowInstanceId,
        destinationScreen: data.destinationScreen,
        flowStartTimeSinceEpochMillis: data.flowStartTimeSinceEpochMillis,
        timeToBootJsMillis: data.timeToBootJsMillis,
        timeToAbortMillis: data.timeToAbortMillis,
        interactive: data.interactive,
        sourceScreen: data.sourceScreen,
        timeToConsumeTouchEventMillis: data.timeToConsumeTouchEventMillis,
        renderPassName: data.renderPassName,
        timeToRenderMillis: data.timeToRenderMillis,
        resourceAcquisitionStatus: data.resourceAcquisitionStatus 
          ? JSON.stringify(data.resourceAcquisitionStatus)
          : null,
      },
    });
    return NextResponse.json(savedReport, { status: 201 });
  } catch (error) {
    console.error('Error saving render pass report:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}